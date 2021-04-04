import { sessionTimerService } from './services/parameters.service';
import { ServerSocket } from './socket';
import { VoidCallback } from './types/callback.type';

export class Timer {
  private seconds: number;
  private minutes: number;
  private hours: number;
  private interval: NodeJS.Timeout;
  private callback: (timeleft: string) => void

  constructor(callback: (timeleft: string) => void) {
    this.callback = callback;
    this.setup();
  }

  pause(callback?: VoidCallback): void {
    clearInterval(this.interval);
    sessionTimerService.pause(callback);
  }

  start(): void {
    this.interval = setInterval(() => this.countDown(), 1000);
    sessionTimerService.resume();
  }

  parseToString(): string {
    const { seconds, minutes, hours, padStart } = this;
    return `Temps restant: ${padStart(hours)}h ${padStart(minutes)}m ${padStart(seconds)}s`;
  }

  private setup(): void {
    sessionTimerService.createFromSessionTime(doc => {
      this.seconds = doc.time.seconds ?? 0;
      this.minutes = doc.time.minutes ?? 30;
      this.hours = doc.time.hours ?? 1;
      this.start();
    });
  }

  private countDown(): void {
    sessionTimerService.createFromSessionTime(doc => {
      this.seconds = doc.time.seconds ?? 0;
      this.minutes = doc.time.minutes ?? 30;
      this.hours = doc.time.hours ?? 1;

      this.seconds = this.seconds - 1;
      if (this.seconds < 0) {
        this.seconds = 59;
        this.minutes = this.minutes - 1;
      }
      if (this.minutes < 0) {
        this.minutes = 59;
  
        if (this.hours > 0) this.hours = this.hours - 1;
      }
      sessionTimerService.setDoc({ ...doc, time: { hours: this.hours, minutes: this.minutes, seconds: this.seconds }}, () => {
        if (this.hours === 0 && this.minutes === 0 && this.seconds === 0) {
          this.pause();
          ServerSocket.onEnd();
          return;
        }
        this.callback(this.parseToString());
      });
    });
  }

  private padStart(value: number): string {
    return value.toString().padStart(2, '0');
  }

}