/**
 * Performance monitoring and measurement tools for animation optimization
 * Provides real-time metrics and profiling capabilities
 */

class PerformanceMonitor {
  constructor() {
    this.metrics = {
      frameRate: 0,
      averageFrameTime: 0,
      longTasks: [],
      layoutThrashing: 0,
      animationCount: 0,
      memoryUsage: 0,
      startTime: performance.now()
    };
    
    this.observers = [];
    this.frameCounter = 0;
    this.lastFrameTime = performance.now();
    this.frameTimes = [];
    
    this.init();
  }
  
  init() {
    this.setupFrameRateMonitoring();
    this.setupLongTaskObserver();
    this.setupLayoutShiftObserver();
    this.setupMemoryMonitoring();
    this.startPeriodicReporting();
  }
  
  /**
   * Monitor frame rate and frame timing
   */
  setupFrameRateMonitoring() {
    const measureFrame = () => {
      const now = performance.now();
      const frameTime = now - this.lastFrameTime;
      
      this.frameTimes.push(frameTime);
      if (this.frameTimes.length > 60) {
        this.frameTimes.shift(); // Keep only last 60 frames (1 second at 60fps)
      }
      
      // Calculate average frame time and FPS
      this.metrics.averageFrameTime = this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length;
      this.metrics.frameRate = 1000 / this.metrics.averageFrameTime;
      
      // Warn about slow frames
      if (frameTime > 16.67) { // Slower than 60fps
        console.warn(`Slow frame detected: ${frameTime.toFixed(2)}ms (target: <16.67ms)`);
      }
      
      this.lastFrameTime = now;
      this.frameCounter++;
      
      requestAnimationFrame(measureFrame);
    };
    
    requestAnimationFrame(measureFrame);
  }
  
  /**
   * Monitor long tasks that block the main thread
   */
  setupLongTaskObserver() {
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            this.metrics.longTasks.push({
              duration: entry.duration,
              startTime: entry.startTime,
              timestamp: Date.now()
            });
            
            // Keep only recent long tasks
            if (this.metrics.longTasks.length > 50) {
              this.metrics.longTasks.shift();
            }
            
            // Alert for very long tasks
            if (entry.duration > 50) {
              console.warn(`Long task detected: ${entry.duration.toFixed(2)}ms`);
            }
          });
        });
        
        observer.observe({ entryTypes: ['longtask'] });
        this.observers.push(observer);
      } catch (e) {
        console.log('Long task observer not supported');
      }
    }
  }
  
  /**
   * Monitor layout shifts that could indicate animation performance issues
   */
  setupLayoutShiftObserver() {
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.hadRecentInput) return; // Ignore user-initiated shifts
            
            this.metrics.layoutThrashing += entry.value;
            
            if (entry.value > 0.1) {
              console.warn(`Significant layout shift detected: ${entry.value.toFixed(4)}`);
            }
          });
        });
        
        observer.observe({ entryTypes: ['layout-shift'] });
        this.observers.push(observer);
      } catch (e) {
        console.log('Layout shift observer not supported');
      }
    }
  }
  
  /**
   * Monitor memory usage if available
   */
  setupMemoryMonitoring() {
    if ('memory' in performance) {
      const updateMemoryUsage = () => {
        this.metrics.memoryUsage = performance.memory.usedJSHeapSize / 1048576; // MB
        setTimeout(updateMemoryUsage, 1000); // Update every second
      };
      updateMemoryUsage();
    }
  }
  
  /**
   * Count active animations on the page
   */
  updateAnimationCount() {
    const animatedElements = document.querySelectorAll([
      '.animate-fade-in',
      '.animate-slide-in-left',
      '.animate-slide-in-right',
      '.animate-scale-in',
      '.animate-bounce',
      '.animate-pulse',
      '.animate-float',
      '.animate-rotate',
      '.animate-glow',
      '[style*="animation-play-state: running"]'
    ].join(', '));
    
    this.metrics.animationCount = animatedElements.length;
  }
  
  /**
   * Start periodic performance reporting
   */
  startPeriodicReporting() {
    setInterval(() => {
      this.updateAnimationCount();
      
      // Report metrics every 5 seconds in development
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        this.logMetrics();
      }
    }, 5000);
  }
  
  /**
   * Log current performance metrics
   */
  logMetrics() {
    const report = {
      'FPS': Math.round(this.metrics.frameRate),
      'Avg Frame Time': `${this.metrics.averageFrameTime.toFixed(2)}ms`,
      'Long Tasks (recent)': this.metrics.longTasks.length,
      'Layout Shift Score': this.metrics.layoutThrashing.toFixed(4),
      'Active Animations': this.metrics.animationCount,
      'Memory Usage': `${this.metrics.memoryUsage.toFixed(1)}MB`,
      'Session Time': `${((performance.now() - this.metrics.startTime) / 1000).toFixed(1)}s`
    };
    
    console.group('🚀 Animation Performance Metrics');
    Object.entries(report).forEach(([key, value]) => {
      const isGood = this.isMetricGood(key, value);
      console.log(`${key}: %c${value}`, `color: ${isGood ? 'green' : 'orange'}`);
    });
    console.groupEnd();
  }
  
  /**
   * Determine if a metric value is good
   */
  isMetricGood(metric, value) {
    switch (metric) {
      case 'FPS':
        return parseInt(value) >= 55;
      case 'Avg Frame Time':
        return parseFloat(value) <= 18;
      case 'Long Tasks (recent)':
        return parseInt(value) <= 3;
      case 'Layout Shift Score':
        return parseFloat(value) <= 0.1;
      case 'Active Animations':
        return parseInt(value) <= 6;
      case 'Memory Usage':
        return parseFloat(value) <= 50;
      default:
        return true;
    }
  }
  
  /**
   * Get detailed performance report
   */
  getDetailedReport() {
    this.updateAnimationCount();
    
    return {
      frameRate: {
        current: this.metrics.frameRate,
        target: 60,
        status: this.metrics.frameRate >= 55 ? 'good' : 'poor'
      },
      frameTime: {
        average: this.metrics.averageFrameTime,
        target: 16.67,
        status: this.metrics.averageFrameTime <= 18 ? 'good' : 'poor'
      },
      longTasks: {
        count: this.metrics.longTasks.length,
        recentTasks: this.metrics.longTasks.slice(-5),
        status: this.metrics.longTasks.length <= 3 ? 'good' : 'poor'
      },
      layoutShift: {
        cumulativeScore: this.metrics.layoutThrashing,
        target: 0.1,
        status: this.metrics.layoutThrashing <= 0.1 ? 'good' : 'poor'
      },
      animations: {
        active: this.metrics.animationCount,
        target: 6,
        status: this.metrics.animationCount <= 6 ? 'good' : 'poor'
      },
      memory: {
        usage: this.metrics.memoryUsage,
        unit: 'MB',
        target: 50,
        status: this.metrics.memoryUsage <= 50 ? 'good' : 'poor'
      },
      overall: {
        sessionDuration: (performance.now() - this.metrics.startTime) / 1000,
        timestamp: new Date().toISOString()
      }
    };
  }
  
  /**
   * Profile a specific animation or function
   */
  profile(name, fn) {
    const start = performance.now();
    performance.mark(`${name}-start`);
    
    const result = fn();
    
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);
    
    const end = performance.now();
    const duration = end - start;
    
    console.log(`⏱️  ${name} completed in ${duration.toFixed(2)}ms`);
    
    return result;
  }
  
  /**
   * Clean up observers
   */
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Create global instance for debugging
let performanceMonitor;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    performanceMonitor = new PerformanceMonitor();
  });
} else {
  performanceMonitor = new PerformanceMonitor();
}

// Export for use in console and other modules
window.PerformanceMonitor = PerformanceMonitor;
window.performanceMonitor = performanceMonitor;

// Add convenience methods to window for debugging
window.getAnimationMetrics = () => performanceMonitor?.getDetailedReport();
window.logAnimationMetrics = () => performanceMonitor?.logMetrics();