/**
 * Author: masakokh
 * Year: 2023
 * Note: Main file
 * Version: 1.0.0
 */
const ContentType   = {
    JSON    : 'json'
    , TEXT  : 'text'
}

const ElementId     = {
    WINDOW_CONTENT  : 'win_content'
    , WINDOW_HEIGHT : 'win_height'
    , WINDOW_INDEX  : 'win_index'
    , WINDOW_MAIN   : 'win_main'
    , WINDOW_STATUS_TYPE   : 'win_status_type'
    , WINDOW_TITLE  : 'win_title'
    , WINDOW_WIDTH  : 'win_width'
}

const BoxColorType  = {
    ERROR           : 'red'
    , FAIL          : 'pink'
    // , IGNORE        : 'white'
    , INFO          : 'blue'
    , SUCCESS       : 'green'
    , TRACK         : 'grey'
    , WARNING       : 'yellow'
}


class SmileViewer {
    constructor(arg) {
        // private
        // main
        this._mainIndex         = arg.index ?? '1'
        this._mainParentId      = arg.containerId
        this._mainContainer     = null
        this._mainStyle         = ''
        this._mainTheme         = arg.theme ?? 'theme-default'

        // data
        this._exportValue       = ''

        // label
        this._context           = ''
        this._contentTotal      = 0
        this._contentType       = ContentType.JSON

        // size
        this._sizeHeight        = arg.size[1]
        this._sizeWidth         = arg.size[0]

        // translation
        this._translate         = arg._translate

        // window
        this._windowClose       = 0
        this._windowMinimize    = 1
        this._windowTitle       = ''
        this._windowTotal       = 0
        this._windowType        = 5

        // init
        this._init()
    }

    _appendIndex(value) {
        return this._mainIndex + '_' + value
    }

    _buttonClose(buttonClose) {
        buttonClose.addEventListener('click', (event) => {
            document.getElementById(this._appendIndex(ElementId.WINDOW_MAIN)).remove()
        })
    }

    _buttonMinimize(buttonMinimize, showIcon, hideIcone) {
        buttonMinimize.addEventListener('click', (event) => {
            if (document.getElementById(this._appendIndex(ElementId.WINDOW_CONTENT)).hidden) {
                // this._appendIndex(ElementId.WINDOW_INDEX)
                buttonMinimize.innerHTML    = hideIcone
            }
            else if (document.getElementById(this._appendIndex(ElementId.WINDOW_CONTENT)).hidden == false)
            {
                buttonMinimize.innerHTML    = showIcon
            }

            // update
            document.getElementById(this._appendIndex(ElementId.WINDOW_CONTENT)).hidden = !document.getElementById(this._appendIndex(ElementId.WINDOW_CONTENT)).hidden
        })
    }

    _createTop() {
        let conTop          = document.createElement('div')
        , boxColorStatusType= document.createElement('div')
        , buttonClose       = document.createElement('div')
        , buttonMinimize    = document.createElement('div')
        , lableWinIndex     = document.createElement('div')
        , lableTitle        = document.createElement('div')
        // container
        conTop.setAttribute('class', 'con-top')
        boxColorStatusType.setAttribute('class', 'lead-color')
        buttonClose.setAttribute('class', 'button-close button')
        buttonMinimize.setAttribute('class', 'button-minimize button')
        lableWinIndex.setAttribute('class', 'win-index')
        lableTitle.setAttribute('class', 'title')
        // 
        lableWinIndex.setAttribute('id', this._appendIndex(ElementId.WINDOW_INDEX))
        lableTitle.setAttribute('id', this._appendIndex(ElementId.WINDOW_TITLE))

        // modify content
        boxColorStatusType.style.backgroundColor    = this._getBoxTypeByNumeric(this._windowType)
        buttonClose.innerHTML       = '<span>X</span>'
        buttonMinimize.innerHTML    = '<span>_</span>'
        lableTitle.innerHTML        = `<span>${this._windowTitle}</span>`

        // event
        this._buttonClose(buttonClose)
        this._buttonMinimize(buttonMinimize, '<span>-</span>', buttonMinimize.innerHTML)
       
        // add to container
        conTop.style.width   = this._sizeWidth
        conTop.appendChild(buttonMinimize)
        conTop.appendChild(boxColorStatusType)
        conTop.appendChild(lableTitle)
        conTop.appendChild(buttonClose)
        conTop.appendChild(lableWinIndex)
        
        //
        return conTop
    }

    _createMiddle() {
        let conMiddle   = document.createElement('div')
        conMiddle.setAttribute('class', 'con-mid')
        conMiddle.setAttribute('id', this._appendIndex(ElementId.WINDOW_CONTENT))
        conMiddle.style.height  = this._sizeHeight
        conMiddle.style.width   = this._sizeWidth
        // data
        conMiddle.innerHTML     = `<span>${this._context}</span>`
        
        //
        return conMiddle
    }

    _getBoxTypeByNumeric(num) {
        switch (num) {
            case 1:
                return BoxColorType.ERROR
        
            case 2:
                return BoxColorType.FAIL
            case 3:
                return BoxColorType.INFO
            case 4:
                return BoxColorType.SUCCESS
            case 5:
                return BoxColorType.TRACK
            default:
                return BoxColorType.TRACK
        }
    }

    _init() {
        // 
    }

    _render() {
        // reset or reload theme
        // container 
        const container         = document.getElementById(this._mainParentId)
        // main window
        this._mainContainer     = document.createElement('div')
        this._mainContainer.setAttribute('id', this._appendIndex(ElementId.WINDOW_MAIN))
        this._mainContainer.setAttribute('class', this._mainTheme + ' view-container')

        // top
        this._mainContainer.appendChild(this._createTop())
        this._mainContainer.appendChild(this._createMiddle())
        // dimension
        // this._mainContainer.style.height= this._sizeHeight
        this._mainContainer.style.height= '1px'
        this._mainContainer.style.width = this._sizeWidth

        // final
        container.appendChild(this._mainContainer)
    }

    setContent(value) {
        this._context       = value 
    }

    setTheme(value) {
        this._mainTheme     = theme
        this._render()
    } 

    setSizeHeight(value) {
        this._sizeHeight    = value
    }

    setSizeWidth(value) {
        this._sizeWidth     = value
    }

    setWindowIndex(value) {
        this._windowIndex   = value
    }

    setWindowMinimize(mode) {
        // mode is bool
        this._windowMinimize= int(mode)
    }

    setWindowSize(width, height) {
        this._sizeHeight     = height
        this._sizeWidth      = width
    }

    setWindowTitle(title) {
        this._windowTitle    = title
    }

    show(title, content, color) {
        this._context       = content
        this._windowTitle   = title
        this._windowType    = color
        //
        this._render()
    }
}
