
const localStore =  {
    hasData(key) {
        return !!localStorage[key] && !!localStorage[key].length;
    },

    get(key) {
        if (!this.hasData(key)) {
            return false;
        }
        let data = localStorage.getItem(key);
        try {
            return JSON.parse(data);
        }
        catch (e) {
            console.log('ssas');
            return data;
        }
    },

    getAddress(key, name){
        if (this.hasData(key)) {
            let _value = this.get(key);
            if(_value){
                for(let i = 0; i < _value.length; i++){
                    _value[i] = JSON.parse(_value[i]);
                    if(_value[i].name === name){
                        return _value[i].address;
                    }
                }
            }
            return false;
        } else {
            return false;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        }
        catch (e) { localStorage.setItem(key, value); }
    },

    extend(key, value) {
        if (this.hasData(key)) {
            let _value = this.get(key);
            _value.push(JSON.stringify(value));
            this.set(key, _value);
        }
        else {
            this.set(key, value);
        }
    },
    
    update(key, oldKey, newKey, newValue) {
        if (this.hasData(key)) {
            let _value = this.get(key);
            for (let i = 0; i < _value.length; i++){
                _value[i] = JSON.parse(_value[i]);
            }
            let _copy = _value;
            for (let j = 0; j < _copy.length; j++){
                if(_copy[j].name === oldKey){
                    _copy[j].name = newKey;
                    _copy[j].address = newValue;
                }
                _copy[j] = JSON.stringify({name: _copy[j].name, address: _copy[j].address})
            }
            this.set(key, _copy);
        }
        else {
            return false;
        }
    },
    
    remove(key) {
        localStorage.removeItem(key);
    },

    delete(key, name){
        if (this.hasData(key)) {
            let _value = this.get(key);
            for (let i = 0; i < _value.length; i++){
                _value[i] = JSON.parse(_value[i]);
                if(_value[i].name === name){
                    _value.splice(i, 1);
                    break;
                }
                _value[i] = JSON.stringify({name: _value[i].name, address: _value[i].address})
            }
            this.set(key, _value);
        } else {
            return false;
        }
    }
}

export default localStore;
/* [END] LocalStorage Helper [END] */