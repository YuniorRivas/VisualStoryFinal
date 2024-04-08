document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('background-video');
    if (video) {
        video.playbackRate = 1.25;
    }

    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        counter.innerText = '0';
        const updateCounter = () => {
            const target = +counter.getAttribute('data-target');
            const c = +counter.innerText;
            const increment = target / 200;

            if (c < target) {
                counter.innerText = `${Math.ceil(c + increment)}`;
                setTimeout(updateCounter, 9);
            } else {
                counter.innerText = target.toString();
            }
        };
        updateCounter();
    });

    const titleElement = document.querySelector('.title-container h1');
    if (!titleElement.getAttribute('data-animated')) {
        titleElement.setAttribute('data-animated', 'true');
        let displayedText = '';
        const titleText = 'FENTANYL IN NEW YORK';
        let index = 0;

        const decipherTitle = () => {
            if (index < titleText.length) {
                displayedText += titleText[index++];
                titleElement.textContent = displayedText;
                setTimeout(decipherTitle, 100);
            }
        };
        decipherTitle();
    }

    const timelineWrapper = document.querySelector('.timeline-wrapper');
    if (timelineWrapper) {
        let isDown = false;
        let startX;
        let scrollLeft;

        timelineWrapper.addEventListener('mousedown', (e) => {
            isDown = true;
            timelineWrapper.classList.add('active');
            startX = e.pageX - timelineWrapper.offsetLeft;
            scrollLeft = timelineWrapper.scrollLeft;
        });

        timelineWrapper.addEventListener('mouseleave', () => {
            isDown = false;
            timelineWrapper.classList.remove('active');
        });

        timelineWrapper.addEventListener('mouseup', () => {
            isDown = false;
            timelineWrapper.classList.remove('active');
        });

        timelineWrapper.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - timelineWrapper.offsetLeft;
            const walk = (x - startX) * 3;
            timelineWrapper.scrollLeft = scrollLeft - walk;
        });
    }

    const verticalTimeline = document.querySelector('.timeline');
    if (verticalTimeline) {
        const line = document.createElement('div');
        line.classList.add('timeline-line');
        verticalTimeline.prepend(line);

        verticalTimeline.addEventListener('scroll', () => {
            const height = verticalTimeline.scrollHeight - verticalTimeline.scrollTop;
            line.style.height = `${height}px`;
        });

        verticalTimeline.scrollTop = verticalTimeline.scrollHeight / 2 - verticalTimeline.clientHeight / 2;
    }
});
