export class Formatters {
  /**
   * Форматирует секунды в формат "минуты:секунды"
   * @example 125 → "2:05"
   */
  static formatDuration(seconds?: number): string {
    if (!seconds || seconds === 0) return '-';

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  /**
   * Форматирует байты в читаемый формат
   * @example 1024 → "1 KB"
   */
  static formatFileSize(bytes?: number): string {
    if (!bytes || bytes === 0) return '-';

    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  }

  /**
   * Форматирует время в формате MM:SS
   * @example 65 → "01:05"
   */
  static formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
}
