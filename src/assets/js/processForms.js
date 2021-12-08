import axios from 'axios';

const processForms = () => {
    const formElement = document.getElementById('gform_1');
    formElement.addEventListener('submit', function(e) {
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

        axios({
            method: 'POST',
            url: 'http://localhost:3000/submit',
            data: newFormData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then((response) => {
            if (response.status == '200') {
                let key = Object.keys(response.data)[0];
                let confirmationMessage = response.data[key].message;
                document.querySelector('.content').scrollIntoView();
                document.querySelector('.entry-content').innerHTML =
                    '<p>' + confirmationMessage + '</p>';
            }
        });
    });
};

export default processForms;
