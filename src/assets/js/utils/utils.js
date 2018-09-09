let intervalData = {};


export default {

    hide(el) {
        el.style.display = "none";
        return new Promise((resolve) => resolve);
    },
    show(el) {
        el.style.opacity = 1;
        el.style.display = "block";
        return new Promise((resolve) => resolve);
    },
    setOpacity(el, value) {
        if(el) el.style.opacity = value;
    }, 
    fadeOut(el, doneRemoveAfterDone, duration) {
        el.style.opacity = el.style.opacity || 1;
        clearTimeout(intervalData[el.innerHTML]);
        return new Promise((resolve) => {
            (function fade() {
                if((el.style.opacity -= .1) < 0)
                {
                    if(!doneRemoveAfterDone) el.style.display = "none";
                    resolve();
                } else 
                {
                    intervalData[el.innerHTML] = setTimeout(fade, duration || 20);
                }
            })();
        })
    },
    fadeIn(el, duration) {
        if(!el.style.display || el.style.display == "none") el.style.display = "block";
        el.style.opacity = el.style.opacity || 0;
        clearTimeout(intervalData[el.innerHTML]);
        let opacity = 0;
        return new Promise((resolve) => {
            (function fade() {
                opacity = parseFloat(el.style.opacity);
                if((opacity += .1) > 1)
                {
                    resolve();
                } else 
                {
                    el.style.opacity = opacity;
                    intervalData[el.innerHTML] = setTimeout(fade, duration || 20);
                }
            })();
        })
    },
    clearFade() {
        Object.keys(intervalData).map(key => {
            clearTimeout(intervalData[key]);
            intervalData[key] = null;
        })
    },
    delay(duration) {
        return new Promise((resolve) => setTimeout(resolve , duration));
    }

}
