import * as k from 'keymaster';
import WayPoint from "./units/waypoint";

export default class WayPointSprite extends PIXI.Graphics {
    private _model: WayPoint;
    private _color: number;

    constructor({model}: { model: WayPoint }) {
        super();

        this._model = model;
        this._color = 0x000000;

        this._model.emitter.addListener('train:reserve', () => {
            this._color = 0xFFFF00;
            this._draw();
        });

        this._model.emitter.addListener('train:enter', () => {
            this._color = 0xFF0000;
            this._draw();
        });

        this._model.emitter.addListener('train:leave', () => {
            this._color = 0x000000;
            this._draw();
        });

        this.x = this._model.position.x;
        this.y = this._model.position.y;

        this._draw();

        k('w', () => {
            this.visible = !this.visible;
        });
    }

    _draw(): void {
        this.clear();
        this.beginFill(this._color, 0.5);
        this.drawCircle(0, 0, 4);
        this.endFill();
    }
}
