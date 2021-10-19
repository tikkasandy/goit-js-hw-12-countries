class CountdownTimer {
    constructor({ selector, targetDate }) {
        this.selector = selector;
        this.targetDate = targetDate;
        this.refs = this.getRefs(this.selector);
        this.start();
    }

    start() {
        let timerValue = document.querySelectorAll(`${this.selector} .value`);
        setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = this.targetDate - currentTime;
            this.updateClockface(this.getTimeComponents(deltaTime));
        }, 1000);
    }

    getTimeComponents(time) {
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
        return { days, hours, mins, secs };
    }

    pad(value) {
        return String(value).padStart(2, '0');
    };

    updateClockface({ days, hours, mins, secs }) {
        this.refs.days.textContent = days;
        this.refs.hours.textContent = hours;
        this.refs.mins.textContent = mins;
        this.refs.secs.textContent = secs;
    }

    getRefs(selector) {
        const ourTimer = document.querySelector(selector);
        const refs = {
            days: ourTimer.querySelector('[data-value = "days"]'),
            hours: ourTimer.querySelector('[data-value = "hours"]'),
            mins: ourTimer.querySelector('[data-value = "mins"]'),
            secs: ourTimer.querySelector('[data-value = "secs"]'),
        };
        return refs;
    }
}

const myBirthdayTimer = new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date('Apr 05, 2022'),
});
