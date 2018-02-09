export interface NouiFormatter {
    to(value: number): string;
    from(value: string): number;
  }

  export class DefaultFormatter implements NouiFormatter {
    to(value: number): string {
      // formatting with http://stackoverflow.com/a/26463364/478584
      return String(parseFloat(parseFloat(String(value)).toFixed(2)));
    }


    from(value: string): number {
      return parseFloat(value);
    }
  }


  export class TimeFormatter implements NouiFormatter {
    to(value: number): string {
      const h = Math.floor(value / 3600);
      const m = Math.floor(value % 3600 / 60);
      // const s = value - 60 * m - 3600 * h;
      const values = [ h, m ];
      let timeString = '';
      let i = 0;
      for (const v of values) {
        if (values[i] < 10) {
          timeString += '0';
        }
          timeString += values[i].toFixed(0);
        if (i < 1) {
          timeString += ':';
        }
        i++;
      }
      return timeString;
    }

    from(value: string): number {
      const v = value.split(':').map(parseInt);
      let time: number = 0;
      time += v[0] * 3600;
      time += v[1] * 60;
      // time += v[2];
      return time;
    }
  }

