import Vue from 'vue'
import MessageBox from './MessageBox/index'

export const messageBox = (function () {
  // 配置参数
  return function (opts) {
    const defaults = {
      // 默认值
      title: '',
      content: '',
      cancel: '',
      ok: '',
      handleCancel: null,
      handleOk: null
    }

    const MyComponent = Vue.extend(MessageBox)

    for (const attr in opts) {
      defaults[attr] = opts[attr]
    }

    const vm = new MyComponent({
      el: document.createElement('div'),
      data: {
        title: defaults.title,
        content: defaults.content,
        cancel: defaults.cancel,
        ok: defaults.ok
      },
      methods: {
        handleCancel () {
          defaults.handleCancel && defaults.handleCancel.call(this)
          document.body.removeChild(vm.$el)
        },
        handleOk () {
          defaults.handleOk && defaults.handleOk.call(this)
          document.body.removeChild(vm.$el)
        }
      }
    })

    document.body.appendChild(vm.$el)
  }
})()
