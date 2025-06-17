export class BufferHelper {
  static plainToBase64(value: string): string {
    return Buffer.from(value).toString('base64');
  }
  static base64ToPlain(value: string): string {
    return Buffer.from(value, 'base64').toString();
  }
}
