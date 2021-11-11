import axios from 'axios';

const processForms = () => {
    console.log('processForms.js initiated');
    const formElement = document.getElementById('gform_1');
    formElement.addEventListener('submit', function(e) {
        console.log('#gform_1 event listener');
        e.preventDefault();

        const formData = new FormData(formElement);
        const newFormData = new FormData();
        newFormData.append('form_id', 1);

        // Get only the input fields
        const inputs = Array.from(formData).filter((el) =>
            el[0].startsWith('input')
        );

        // Append input fields to newFormData
        inputs.map((item) =>
            newFormData.append(item[0].replace('input_', ''), item[1])
        );

        let config = {
            method: 'POST',
            url: 'http://localhost:3000/submit',
            data: newFormData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        axios(config).then((response) => {
            // console.log('success!', JSON.stringify(response.data));
            if (response.status == '200') {
                window.location = '/';
            }
        });
    });
};

export default processForms;
