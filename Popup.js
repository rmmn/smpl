class Popup {

    constructor() {
        this.elem = `<div class="popup" role="modal" data-id="">
        <div class="overlay"></div>
            <div class="content">
                <h3></h3>
                <div></div>
                <ul class="actions">
                    <li class="first"><button type="button" class="primary small main"></button></li>
                    <li><button type="button" class="small second"></button></li>
                </ul>
            </div>
        </div>`;
    }

    Open({
        ID: id = 'popup-' + Math.floor(Math.random() * 111),
        Class: _class,
        Title: title,
        Html: html,
        PrimaryButtonText: primaryText,
        SecondaryButtonText: secondaryButtonText,
        PrimaryAction: primaryCallback = () => { },
        SecondaryAction: secondaryCallback = () => { },
        OnOpened: openCallback = () => { },
        OnClosed: closeCallback = () => { },
        ActionButton: actionBtn = false,
        ActionButtonText: actionBtnText,
        ActionButtonCallback: actionBtnCallback = () => { }
    }) {

        let uniqueID = Math.floor(Math.random() * 111),
            $popup = $(this.elem);

        $(this.elem).attr('id', id.replace('#', '')),
            $popup.addClass((_class != undefined ? _class : ''));
        $popup.attr('data-id', uniqueID);
        $popup.find('.content>h3').html(title);
        $popup.find('.content>div').html(html);
        $popup.find('.content>.actions>li>button.main').html(primaryText);
        $popup.find('.content>.actions>li>button.second').html(secondaryButtonText);

        if (actionBtn) {
            $popup.find('.content>.actions>li.first')
                .after(`<li><button type="button" class="primary small action">${actionBtnText}</button></li>`);
        }


        if (document.querySelector('.popup') instanceof Object) {
            console.log($popup, "IF EXIST");

            $popup.animate({
                opacity: 0
            }, 500, () => {
                $('.popup').css('display', 'none');
                $('.popup').remove();

                $('body').prepend($popup);
                console.log($popup, "NEW POPUP");
                $popup.css('display', 'flex');
                $popup.animate({
                    opacity: 1
                }, 500, openCallback);
            });

        } else {

            $('body').prepend($popup);
            console.log($popup, "IF NOT EXIST");
            $popup.css('display', 'flex');
            $popup.animate({
                opacity: 1
            }, 500, openCallback);

        }

        $popup.find('.content>.actions>li>button.main').on('click', function () {

            primaryCallback();

            $popup.animate({
                opacity: 0
            }, 500, () => {
                $popup.remove();
                closeCallback();
            });
        });

        if (actionBtn) {
            $popup.find('.content>.actions>li>button.action').on('click', function () {

                actionBtnCallback();

                $popup.animate({
                    opacity: 0
                }, 500, () => {
                    $popup.remove();
                    closeCallback();
                });
            });
        }

        $popup.find('.content>.actions>li>button.second').on('click', function () {

            secondaryCallback();

            $popup.animate({
                opacity: 0
            }, 500, () => {
                $popup.remove();
                closeCallback()
            });

        });
    }
}
