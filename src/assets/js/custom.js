import $ from 'jquery'
// Plan checkbox
// $(function () {
//     var checkbox = $('.plan-option-checkbox > input');

//     function toggleCheck(e) {
//         var that = $(this);

//         if (that.is(':checked')) {
//             that.closest('.plan-option').addClass('is-checked');
//         } else {
//             that.closest('.plan-option').removeClass('is-checked');
//         }
//     }

//     checkbox.each(toggleCheck);
//     checkbox.on('change', toggleCheck);
// });

// Expandables
// $(function () {
//     var trigger = $('[data-trigger="expandable"]'),
//         expandable = $('.expandable');

//     for (var i = 0; i < expandable.length; i++) {
//         (function (n) {
//             trigger[n].id = 'expandable-' + i;
//             expandable[n].id = 'expandable-' + i;

//             trigger[n].onclick = function () {
//                 var that = this;

//                 if (!trigger[n].classList.contains('is-active')) {
//                     trigger[n].classList.add('is-active');
//                     expandable[n].style.maxHeight = expandable[n].scrollHeight + 'px';
//                 } else {
//                     trigger[n].classList.remove('is-active');
//                     expandable[n].style.maxHeight = '';
//                 }
//             }
//         })(i);
//     }
// });

//Modal
// $(function () {
//     const trigger = $('a[data-trigger="f-modal"], div[data-trigger="f-modal"], button[data-trigger="f-modal"], [data-trigger="f-modal"]');
//     const close = $('[data-dismiss="f-modal"], .f-modal-close');
//     const modal = $('.f-modal');
//     const body = $('body');

//     var a, b;

//     function openModal(e) {
//         e.preventDefault();

//         var $this = $(this),
//             target = $($this.attr('data-href'));

//         body.removeClass('f-modal-is-open');
//         modal.removeClass('f-modal-open');
//         modal.hide();
//         clearTimeout(b);

//         if (!body.hasClass('f-modal-is-open')) {
//             target.show();

//             a = setTimeout(function () {
//                 body.addClass('f-modal-is-open');
//                 target.addClass('f-modal-open');
//             }, 50);
//         }
//     }

//     function closeModal() {
//         body.removeClass('f-modal-is-open');
//         modal.removeClass('f-modal-open');

//         b = setTimeout(function () {
//             modal.hide();
//         }, 400);
//     }

//     body.on('click', function (e) {
//         var container = $('.f-modal-content');

//         if (!container.is(e.target) && container.has(e.target).length === 0) {
//             if (body.hasClass('f-modal-is-open')) {
//                 closeModal();
//             }
//         }
//     });

//     trigger.on('click', openModal);
//     close.on('click', closeModal);
// });

// Pre-populate form fields
// $(function () {
//     var field = document.querySelectorAll('[data-pre-populate]');

//     for (var i = 0; i < field.length; i++) {
//         var fieldGhost = document.createElement('div');

//         // CSS styling
//         fieldGhost.style.display = 'inline-block';
//         fieldGhost.style.position = 'absolute';
//         fieldGhost.style.top = '50px';
//         fieldGhost.style.left = '25px';
//         fieldGhost.style.color = '#000000';
//         fieldGhost.style.letterSpacing = '-0.2px';
//         fieldGhost.style.pointerEvents = 'none';

//         // Add text
//         fieldGhost.innerText = field[i].getAttribute('data-pre-populate');

//         // Append to corresponding field parent
//         field[i].parentNode.appendChild(fieldGhost);

//         // Get the width of the box
//         var fieldGhostW = fieldGhost.getBoundingClientRect().width;

//         field[i].style.paddingLeft = 25 + fieldGhostW + 15 + 'px';
//     }
// });

// SVG record status
// $(function () {
//     var recordStatusSVG = $('.record-status-svg');

//     recordStatusSVG.each(function () {

//         var that = $(this);
//         var val = parseInt(that.parent().data('progress'));
//         var recordStatusProgress = that.find('.record-status-progress');

//         if (isNaN(val)) {
//             val = 100;
//         } else {
//             var r = recordStatusProgress.attr('r');
//             var c = Math.PI * (r * 2);

//             if (val < 0) {
//                 val = 0;
//             }
//             if (val > 100) {
//                 val = 100;
//             }

//             var pct = ((100 - val) / 100) * c;

//             recordStatusProgress.css({strokeDashoffset: pct});
//         }

//     });
// });

// Datepicker
// $(function () {
//     var element = $('.datepicker');

//     element.datepicker({
//         autoclose: true,
//         orientation: 'bottom',
//         templates: {
//             leftArrow: '<i class="far fa-angle-left"></i>',
//             rightArrow: '<i class="far fa-angle-right"></i>',
//         },
//     });
// });

// Form control
$(function () {
    let $formInput = $('input, textarea, select');

    $formInput.on('focus', function () {
        let that = $(this);

        that.parent().addClass('is-focus');
    });

    $formInput.on('blur', function () {
        let that = $(this);

        if (that.is('input') || that.is('textarea')) {
            if (that.val().length === 0) {
                that.parent().removeClass('is-focus');
            } else {
                that.parent().addClass('is-filled');
                that.parent().removeClass('is-focus');
            }
        } else {
            that.parent().removeClass('is-focus');
        }
    }).trigger('blur');

    $formInput.on('keyup keydown', function () {
        let that = $(this);

        if (that.val().length === 0) {
            that.parent().removeClass('is-filled');
        } else {
            that.parent().addClass('is-filled');
        }
    });
});

// Table row expand
// $(function () {
//     var element = document.querySelectorAll('.tr-has-expandable');

//     for (var i = 0; i < element.length; i++) {
//         element[i].onclick = function (e) {
//             var that = this;

//             if ($(that.querySelector('.td-expand')).is(e.target) || $(that.querySelector('.td-expand')).has(e.target).length > 0) {
//                 if (!that.classList.contains('is-expanded')) {
//                     that.querySelector('.td-expand').children[0].classList.remove('fa-chevron-down');
//                     that.querySelector('.td-expand').children[0].classList.add('fa-chevron-up');
//                     that.classList.add('is-expanded');
//                     that.nextElementSibling.children[0].children[0].style.maxHeight = that.nextElementSibling.children[0].children[0].scrollHeight + 'px';
//                 } else {
//                     that.querySelector('.td-expand').children[0].classList.remove('fa-chevron-up');
//                     that.querySelector('.td-expand').children[0].classList.add('fa-chevron-down');
//                     that.classList.remove('is-expanded');
//                     that.nextElementSibling.children[0].children[0].style.maxHeight = '';
//                 }
//             }
//         }
//     }
// });

// Toggle input field
$(function () {
    var element = $('[data-toggle="input-field"]');

    element.on('change', function () {
        var that = $(this);

        if (that.is(':checked')) {
            that.parent().next().show();
        } else {
            that.parent().next().hide();
        }
    });
});

// Add users separated by a comma
// $(function () {
//     var element = $('[data-add-users="true"]');

//     var body = $('body');

//     var addedUser;
//     var addedUsersContainer = $('.added-users');

//     var deleteUsers = $('[data-delete="users"]');

//     element.on('keyup keypress', function (e) {

//         var that = $(this);
//         var inputVal = that.val();

//         if (inputVal.charAt(inputVal.length - 1) == ',') {
//             that.val('');

//             var revisedInputVal = inputVal.substr(0, (inputVal.length - 1));

//             addedUser = $('<div class="added-users-user" />');

//             addedUser.text(revisedInputVal);
//             addedUser.appendTo('.added-users');
//         }

//     });

//     body.on('click', function(e) {
//         if ($('.added-users-user').is(e.target) || $('.added-users-user').has(e.target).length > 0) {
//             if (!$(e.target).hasClass('is-selected')) {
//                 $(e.target).addClass('is-selected');
//             } else {
//                 $(e.target).removeClass('is-selected');
//             }
//         }
//         if (addedUsersContainer.children().length > 0) {
//             addedUsersContainer.show();
//             $('.set-plan-for-all').removeClass('custom-checkbox-slide-disabled');
//         } else {
//             addedUsersContainer.hide();
//             $('.set-plan-for-all').addClass('custom-checkbox-slide-disabled');
//         }
//     });

//     element.on('keyup', function() {
//         if (addedUsersContainer.children().length > 0) {
//             addedUsersContainer.show();
//             $('.set-plan-for-all').removeClass('custom-checkbox-slide-disabled');
//         } else {
//             addedUsersContainer.hide();
//             $('.set-plan-for-all').addClass('custom-checkbox-slide-disabled');
//         }
//     });

//     deleteUsers.on('click', function(e) {
//         $('.added-users-user.is-selected').remove();
//     });
// });

// Tooltip
// $(function() {
//     $(document).ready(function() {
//         var tooltip = $('[data-toggle="tooltip"]');

//         tooltip.tooltip({
//             placement: 'top',
//         });
//     })
    
// });