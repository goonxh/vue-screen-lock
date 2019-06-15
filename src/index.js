const ScreenLock = {};
let lockVM = null;
let password = [];
// 默认配置
const defaultOption = {
    width: '300px',
    height: '300px',
    firstLock: true,
};

ScreenLock.install = function (Vue) {
    Vue.prototype.$screenLock = function (tip, options) {
        let option = {};
        Object.assign(option, defaultOption);
        if (typeof options === 'object') {
            Object.assign(option, options);
        }
        if (!lockVM) {
            var lockTpl = Vue.extend({
                data: function data() {
                    return {
                        tip: tip,
                        passwordIsTrue: true,
                    };
                },
                created() {
                },
                mounted() {
                },
                methods: {
                    startHandler(e) {
                        e.preventDefault();
                        document.addEventListener('mousemove', this.handlerMove)
                    },
                    handlerMove() {
                        Array.from(document.querySelectorAll('.sl-lock-item')).forEach(item => {
                            item.onmousemove = () => {
                                if (Array.from(item.classList).findIndex(cl => cl === 'hovered') === -1) {
                                    item.classList.add('hovered');
                                    password.push(item.getAttribute('data-index'));
                                }
                            }
                        })
                    },
                    judgePassword() {
                        document.removeEventListener('mousemove', this.handlerMove);
                        Array.from(document.querySelectorAll('.sl-lock-item')).forEach(item => {
                            item.onmousemove = null;
                        })
                        let hoveredItemList = Array.from(document.querySelectorAll('.hovered'));
                        if (option.firstLock) { // 判断是否是第一次进入锁屏界面
                            if (password.length>0) {
                                window.sessionStorage.setItem('PASSWORD', password);
                                window.location.reload();
                            }
                        } else if (hoveredItemList.length) { // 判断有没有输入手势
                            let _password = window.sessionStorage.getItem('PASSWORD');
                            if (password.join(',') === _password) { // 解锁成功
                                password = [];
                                document.body.removeChild(document.querySelector('.sl-wrapper'))
                            } else { // 手势错误
                                password = [];
                                this.passwordIsTrue = false;
                                hoveredItemList.forEach(item => {
                                    item.classList.replace('hovered', 'failed');
                                })
                                setTimeout(() => {
                                    hoveredItemList.forEach(item => {
                                        item.classList.remove('failed');
                                    });
                                    this.passwordIsTrue = true;
                                }, 1000)
                            }
                        }
                    },
                },
                render(h) {
                    return h(
                        'div', {
                            class: ['sl-wrapper'],
                        }, [
                            h('p', {
                                domProps: {
                                    innerHTML: option.firstLock ? '设置手势' : '欢迎回来'
                                },
                                style: {
                                    padding: '20px',
                                },
                            }),
                            h('p', {
                                domProps: {
                                    innerHTML: !option.firstLock ? this.passwordIsTrue ? '请解锁' : '手势错误' : '',
                                },
                                style: {
                                    color: this.passwordIsTrue ? '' : '#EB7A77',
                                    padding: '20px',
                                },
                            }),
                            h('div', {
                                class: ['sl-content'],
                                style: {
                                    width: option.width,
                                    height: option.height,
                                    marginLeft: -parseInt(option.width) / 2 + 'px',
                                    marginTop: -parseInt(option.height) / 2 + 'px',
                                },
                                on: {
                                    mouseleave: () => {
                                        this.judgePassword();
                                    },
                                }
                            }, [
                                    h('ul', {
                                        class: ['sl-lock-board'],
                                        on: {
                                            click: () => {
                                            },
                                            mousedown: (event) => {
                                                this.startHandler.call(this, event, self);
                                            },
                                            mouseup: () => {
                                                this.judgePassword();
                                            },
                                        }
                                    }, [
                                            Array.apply(null, { length: 9 }).map((value, index) => {
                                                return [
                                                    h('li', {
                                                        class: ['sl-lock-item'],
                                                        attrs: {
                                                            'data-index': index,
                                                        }
                                                    }, [
                                                            h('div', {
                                                                class: ['sl-lock-dot'],
                                                            })
                                                        ])
                                                ]
                                            })
                                        ]
                                    )
                                ]
                            )
                        ]
                    )
                },
            });
            let lockVM = new lockTpl();
            let tpl = lockVM.$mount().$el;
            document.body.appendChild(tpl);
        }
    }
}

export default ScreenLock;