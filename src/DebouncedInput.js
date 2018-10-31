import React, {
    Component
} from 'react';

/**
 * This Input field Component calls onChange, if the user stops tying for a given amount of time.
 */

export default class DebouncedInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputText: props.initialData
        }
        
        // Tracks the timer id
        this._timerID = null;
        // Duration to wait
        this._duration = 750;

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleKeyDown() {
        clearTimeout(this._timerID);
        this._timerID = setTimeout(() => {
            this.props.onChange(this.state.inputText);
        }, this._duration);
    }

    // If suddenly user presses tab or anything...
    handleBlur(){
        clearTimeout(this._timerID);
        this.props.onChange(this.state.inputText);
    }

    render() {
        return ( <
            input type = "text"
            placeholder = {
                this.props.placeholder
            }
            value = {
                this.state.inputText
            }
            onKeyDown = {
                this.handleKeyDown
            }
            onBlur = {
                this.handleBlur
            }
            onChange = {
                (event) => this.setState({
                    inputText: event.target.value
                })
            }
            />
        )
    }
}