module.exports  =  DateTime  = {
    _cb: null,

    init: function(cb) {
        this._cb  = cb
    },

    now: function() {
        return this._cb();
    }
};