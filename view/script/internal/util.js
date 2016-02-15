import $ from 'jquery';

export default {
    getFormData: function(formSelector) {
        let inputs = $(formSelector + ' input');
        let data = {};

        inputs.each(function() {
            if(this.value !== '') {
                data[this.name] = this.value;
            }
        });

        return data;
    }
};
