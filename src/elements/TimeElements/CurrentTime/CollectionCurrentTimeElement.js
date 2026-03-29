import { ConfigState } from "@/services/ConfigState";

export class CollectionCurrentTimeElement {
    static collectionFormattedTimeElementQuery = '.amplitude-current-time[data-amplitude-collection-key]:not([data-amplitude-audio-index])';
    static collectionHoursTimeElementQuery = '.amplitude-current-hours[data-amplitude-collection-key]:not([data-amplitude-audio-index])';
    static collectionMinutesTimeElementQuery = '.amplitude-current-minutes[data-amplitude-collection-key]:not([data-amplitude-audio-index])';
    static collectionSecondsTimeElementQuery = '.amplitude-current-seconds[data-amplitude-collection-key]:not([data-amplitude-audio-index])';

    #currentTime;

    constructor( currentTime ){
        this.#currentTime = currentTime;
    }

    sync(){
        this.#syncFormattedTimeElement();
        this.#syncHourTimeElement();
        this.#syncMinuteTimeElement();
        this.#syncSecondTimeElement();
    }

    #syncFormattedTimeElement(){
        let timeFormat = ConfigState.getTimeFormat();
        let activeCollectionKey = ConfigState.getActiveCollection();

        let elements = document.querySelectorAll( CollectionCurrentTimeElement.collectionFormattedTimeElementQuery );
        let formattedTime = timeFormat.replace( 'HH', this.#currentTime.hours )
                                      .replace( 'MM', this.#currentTime.minutes )
                                      .replace( 'SS', this.#currentTime.seconds );
        
        elements.forEach( ( element ) => {
            let elementCollectionKey = element.getAttribute('data-amplitude-collection-key');

            if( activeCollectionKey == elementCollectionKey ){
                element.textContent = formattedTime;
            }else{
                element.textContent = '00:00';
            }
        })
    }

    #syncHourTimeElement(){
        let elements = document.querySelectorAll( CollectionCurrentTimeElement.collectionHoursTimeElementQuery );
        let activeCollectionKey = ConfigState.getActiveCollection();

        elements.forEach( ( element ) => {
            let elementCollectionKey = element.getAttribute('data-amplitude-collection-key');

            if( activeCollectionKey == elementCollectionKey ){
                element.textContent = this.#currentTime.hours;
            }else{
                element.textContent = '00';
            }
        });
    }

    #syncMinuteTimeElement(){
        let elements = document.querySelectorAll( CollectionCurrentTimeElement.collectionMinutesTimeElementQuery );
        let activeCollectionKey = ConfigState.getActiveCollection();

        elements.forEach( ( element ) => {
            let elementCollectionKey = element.getAttribute('data-amplitude-collection-key');

            if( activeCollectionKey == elementCollectionKey ){
                element.textContent = this.#currentTime.minutes;
            }else{
                element.textContent = '00';
            }
        });
    }

    #syncSecondTimeElement(){
        let elements = document.querySelectorAll( CollectionCurrentTimeElement.collectionSecondsTimeElementQuery );
        let activeCollectionKey = ConfigState.getActiveCollection();

        elements.forEach( ( element ) => {
            let elementCollectionKey = element.getAttribute('data-amplitude-collection-key');

            if( activeCollectionKey == elementCollectionKey ){
                element.textContent = this.#currentTime.seconds;
            }else{
                element.textContent = '00';
            }
        });
    }
}