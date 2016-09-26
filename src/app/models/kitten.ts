export class Kitten {
    constructor(public id: number,
      public name: string,
      private _width: number,
      private _height: number){

    }

    public get pictureUrl(): string{
      return `http://placekitten.com/${this._width}/${this._height}`;
    }
}
