window.addEventListener("DOMContentLoaded", function () {
    const elForm = document.querySelector(".o-form-opinion");
    const elSubmit = elForm.querySelector('input[type="submit"]');
    const allQuestionsEl = elForm.querySelectorAll('.o-form-opinion__group--items');
    const elRadios = elForm.querySelectorAll('.o-form-opinion__group input[type="radio"]');
    const elTextareas = elForm.querySelectorAll('.o-form-opinion__group input[type="textarea"]');
    const elalert = elForm.querySelector(".js-alert");
    const elValidateBtn = elForm.querySelector(".js-validate-btn");
    const validator = { totalAnswered: 0, campo: false, frase: "Existem campos ainda não preenchidos" };
    const allQuestions = {};
    let beforeHadComplement = false;

    function disableBtn() {
        if (elSubmit) {
            elSubmit.disabled = true;
        }
    }
    disableBtn();

    elRadios.forEach((radio) => {
        radio.addEventListener("click", function () {
            const radioParent = this.closest(".o-form-opinion__group--items");
            createObjOfAnswer(radioParent);
        });
    });

    elTextareas.forEach((textarea) => {
        textarea.addEventListener("keyup", function () {
            const complementInput = textarea.value;
            const textareaId = textarea.id;
            const parentRadio = document.querySelector(`.o-form-opinion__group input[type="radio"][data-complement="${textareaId}"]`);

            if(parentRadio.checked) createObjOfAnswer(false, textareaId, complementInput);
        });
    });

    function createObjOfAnswer(radioParent, textareaId = false, complementInput = false) {
        let questionObj;

        if(radioParent) {
            const checkedRadio = radioParent.querySelector('.o-form-opinion__group input[type="radio"]:checked');
            const questionID = radioParent.id;
            let complementEl;
            let complement;

            allQuestions[questionID] = {
                answered: true,
                beforeHadComplement: beforeHadComplement,
                complementID: false,
                complement: false
            }
            questionObj = allQuestions[questionID];
            questionObj.complementID = (checkedRadio.dataset.complement != undefined) ? checkedRadio.dataset.complement : false;

            beforeHadComplement = (questionObj.complementID != '')? true : false;
            complementEl = (questionObj.complementID)? document.querySelector(`#${questionObj.complementID}`) : false;
            complement = (questionObj.complementID) ? document.querySelector(`#${questionObj.complementID}`).value : false;
            questionObj.complement = complement;
        }
        
        if(textareaId) {
            const questionID = document.querySelector(`#${textareaId}`).closest(".o-form-opinion__group--items").id;
            questionObj = allQuestions[questionID];
            questionObj.complement = (questionObj.complementID == textareaId) ? complementInput : false;
        }

        validateForm();
    };

    function validateForm() {
        for (let question in allQuestions) {
            if (allQuestions[question].answered == true) {
                if (allQuestions[question].complementID == false) validator.totalAnswered++;
                if(allQuestions[question].complement != '') validator.totalAnswered++;
            }
        }

        validator.campo = (allQuestionsEl.length == validator.totalAnswered ) ? true : false;
        console.log(validator.campo);
        console.log(validator);

        if(validator.campo == true) {
            elSubmit.disabled = false;
            elalert.textContent = '';
        } else {
            disableBtn();
            elalert.textContent = validator.frase;
        }

        validator.totalAnswered = 0;
    }

    elValidateBtn.addEventListener("mouseenter", function () {
        elSubmit.disabled == true ? (elalert.textContent = "Existem campos ainda não preenchidos") : "";
    });
});
