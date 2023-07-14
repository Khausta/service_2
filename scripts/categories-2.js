'use strict';

document.addEventListener('DOMContentLoaded', () => {

     //menu scroll effects
     let header = document.querySelector('.header');

     let headerBlockHeight = +window.getComputedStyle(header, null).height.replace('px', '');
 
     window.addEventListener('scroll', () => {
       getStickyHeader(header, headerBlockHeight);
     })
 
     function getStickyHeader(elem, triggerHeight) {
       if (window.scrollY >= triggerHeight) {
         elem.classList.add('header-traid-in__sticky_js');
         
       } else {
         elem.classList.remove('header-traid-in__sticky_js');
       
       }  
     }
 
   //hide menu on scroll
 
   function hideUnhideMenuOnScroll() {
     const changesSection = document.querySelector('.category-info__category-image');
     let scrollPosition = document.documentElement.scrollTop;
   
 
     window.onscroll = function() {
       let currentScrollPosition = document.documentElement.scrollTop;
 
       if (scrollPosition < currentScrollPosition && scrollPosition > changesSection.clientHeight / 3) {
           header.classList.add('_hide_js');
       } else {
         header.classList.remove('_hide_js');
       }
       scrollPosition = currentScrollPosition;
       }
     }
 
     hideUnhideMenuOnScroll();



    let options = {
        rootMargin: '0px',
        threshold: 0.5,
    };
    
    let appearance = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.paddingTop = 0;
            }
        })
    }
 
    const observer = new IntersectionObserver(appearance, options);
    const targets = document.querySelectorAll('.changes__item_js');
    
    targets.forEach(item => {
        observer.observe(item);
    })

    
    class ValidationForm {
        constructor (form) {
          this.form = form;
          this.inputWrappers = this.form.querySelectorAll('div');
          this.button = this.form.querySelector('button');
          this.inputs = this.form.querySelectorAll('.__js__input');
          this.modalThanks = document.querySelector('.modal-thanks');
          this.inputs.forEach(element => {
            if (element.name == 'name') {
              this.name = element
            } else if (element.name ==  'tel') {
              this.tel = element
            } else if (element.name == 'email') {
              this.email = element
            } else if (element.name == 'message') {
              this.message = element
            }
          })
                
          // console.log(this.form, this.button, this.name, this.tel, this.email, this.message); checked
      
        }
    
        initForm() {
    
          const phoneOptions = {
              mask: '+{7} (000) 000-00-00',
          };
    
          new IMask(this.tel, phoneOptions);
         
          this.inputWrappers.forEach(wrapper => {
            const input = wrapper.querySelector('input');
            const errText = wrapper.querySelector('p');
            input.addEventListener('input', (event) => this.handleInputChanges(event, input, errText));
            input.addEventListener('blur', (event) => this.handleInputBlur(event, input, errText));
          })
    
          // this.button.addEventListener('click', (event)=> {
          //     event.preventDefault();
          //     this.sendForm(event);
              
          // })

          this.button.addEventListener('click', (event) => {
            event.preventDefault();
            let isValid = this.form.checkValidity();
            if(isValid) this.sendForm();
          })
    
        }
    
        setBtnDisabled() {
          this.button.disabled = true;
          this.button.classList.add('_disabled');
        }
    
        setBtnActive() {
            this.button.disabled = false;
            this.button.classList.remove('_disabled');
        }
    
        handleInputChanges = (event, input, errText) => {
            (this.form.checkValidity()) ? this.setBtnActive() : this.setBtnDisabled();
    
            if (input.validity.valid && errText.classList.contains('_unhide')) {
              errText.classList.remove('_unhide');
            }
              
        }
    
        handleInputBlur = (event, input, errText) => {
          if(!input.validity.valid) {
            errText.classList.add('_unhide');
          }
        }
    
        sendForm(event) {
          let formData = new FormData(this.form);
    
          for (let pair of formData.entries()) {
              console.log(pair);
          }
    
          fetch('https://www.yamaguchi.ru/', {
              method: 'POST',
              body: formData,
              headers: {
                  'Access-Control-Allow-Origin': "*"
              }
          })
          .then(res=> {
              alert(res);
              this.showModal();
              this.form.reset();
          })
          .catch(err=>{
              console.log(err);
          })
        }

        hideModal() {
          this.modalThanks.addEventListener('click', (e) =>  {
            if(e.target === e.currentTarget || e.target.classList.contains('modal-thanks__close')) {
              this.modalThanks.classList.remove('modal-thanks__active');
            }
          });
        }
    
        showModal() {
          this.modalThanks.classList.add('modal-thanks__active');
          this.hideModal();
        }
    
      }
    
      new ValidationForm(document.querySelector('.contacts__form')).initForm();


})

