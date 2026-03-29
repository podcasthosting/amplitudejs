import { config } from "../config";
import { ConfigState } from "./ConfigState";
import { Debug } from "./Debug";

export class Callbacks{
    #events = [
        'abort',
        'error',
        'loadeddata',
        'loadedmetadata',
        'loadstart',
        'pause',
        'playing',
        'play',
        'progress',
        'ratechange',
        'seeked',
        'seeking',
        'stalled',
        'suspend',
        'timeupdate',
        'volumechange',
        'waiting',
        'canplay',
        'canplaythrough',
        'durationchange',
        'ended'
    ];

    handleNativeAudioElementEvents(){
        if( this._boundHandlers ){
            this._boundHandlers.forEach( function( handler, event ){
                config.audio_element.removeEventListener( event, handler );
            });
        }

        this._boundHandlers = new Map();

        let self = this;
        this.#events.forEach( function( event ){
            let handler = function(){
                Callbacks.run( event );
            };
            self._boundHandlers.set( event, handler );
            config.audio_element.addEventListener( event, handler );
        });
    }

    static run( event ){
        let callback = ConfigState.getCallback( event );

        if( callback ){
            Debug.writeMessage( "Running Callback for event '" + callback.event + "' with method '" + callback.handler + "'");

            try {
                window[callback.handler]();
            } catch ( error ){
                if (error.message == "CANCEL EVENT") {
                    throw error;
                }else{
                    Debug.writeMessage( error.message );
                }
            }
        }
    }
}