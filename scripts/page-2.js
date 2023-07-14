
document.addEventListener('DOMContentLoaded', () => {



 

  let header = document.querySelector('.header');

    //menu scroll effects
    let headerBlockHeight = +window.getComputedStyle(header, null).height.replace('px', '');

    window.addEventListener('scroll', () => {
      getStickyHeader(header, headerBlockHeight);
    })

    function getStickyHeader(elem, triggerHeight) {
      if (window.scrollY >= triggerHeight) {
        elem.classList.add('header__sticky_js');
        
      } else {
        elem.classList.remove('header__sticky_js');
      
      }  
    }

  //hide menu on scroll

  function hideUnhideMenuOnScroll() {
    const serviceCenter = document.querySelector('.service-center');
    let scrollPosition = document.documentElement.scrollTop;
  

    window.onscroll = function() {
      let currentScrollPosition = document.documentElement.scrollTop;

      if (scrollPosition < currentScrollPosition && scrollPosition > serviceCenter.clientHeight) {
          header.classList.add('header__hide_js');
          // wrapper.classList.remove('header__black-bgc_js');
      // } else if(currentScrollPosition <= 0) {
      //   wrapper.classList.remove('header__black-bgc_js');
      } else {
        header.classList.remove('header__hide_js');
        // wrapper.classList.add('header__black-bgc_js');
      }
      scrollPosition = currentScrollPosition;
      }
    }

    hideUnhideMenuOnScroll();


    //open moile menu
    function openMobileMenu() {
      let mobMenu = document.querySelector('.header__mobile-list');
      let openBtn = document.querySelector('.header__menu-burger');
      let closeBtn = document.querySelector('.header__mobile-list__close');
      let menuItems = document.querySelectorAll('.header__mobile-list__menu-item');
      openBtn.addEventListener('click', () => {
        mobMenu.classList.add('_active');
      });
      closeBtn.addEventListener('click', () => {
        mobMenu.classList.remove('_active');
      });
  
        menuItems.forEach( item  => {
          
          item.addEventListener('click', () => {
            mobMenu.classList.remove('_active');
          })
        })
      }
  
      openMobileMenu();
  

    //faq 
    document.querySelectorAll('.faq__question').forEach( item => {
        item.addEventListener('click', () => {
          
          const arrow = item;
          const content = item.nextElementSibling;
    
          if (content.style.maxHeight) {
            document.querySelectorAll('.faq__text').forEach( item => {
              item.style.maxHeight = null;
              item.style.opacity = null;
              }) 
            document.querySelectorAll('.faq__question').forEach(item => {
              item.classList.remove('_active');
            })
          } else {
            document.querySelectorAll('.faq__text').forEach( item => {
              item.style.maxHeight = null;
              item.style.opacity = null;  
            })
            content.style.maxHeight = content.scrollHeight + 'px';
            content.style.opacity = 1;
            
            document.querySelectorAll('.faq__question').forEach(item => {
              item.classList.remove('_active');
            })
            arrow.classList.add('_active');
          }
        })
      })

         //validation and sending form
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

      this.button.addEventListener('click', (event)=> {
          event.preventDefault();
          this.sendForm(event);
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

    showModal() {
      this.modalThanks.classList.add('modal-thanks__active');
    }

  }


  let secondForm = document.querySelector('.contacts__form');
  let firstForm = document.querySelector('.service-center__form');

  new ValidationForm(secondForm).initForm();
  new ValidationForm(firstForm).initForm();


  let citySelector = document.querySelector('.city__select');
  let list = document.querySelector('.city__city-list');
  let cityItems = document.querySelectorAll('.city__list-item');
  let cityInput = document.querySelector('.city__city-selected-desc');
  let currentCity =  cityInput.textContent;

  class CitySelectionDesc {
    constructor(selector, list, listItems, cityInput) {
      this.selector = selector;
      this.list = list;
      this.listItems = listItems;
      this.cityInput = cityInput;
      this.currentCity = currentCity;
    
      if(localStorage['city']) {
        this.cityInput.textContent = localStorage.getItem('city');
      }
    }

    open() {
      this.selector.classList.add('city__select_active');
      this.list.classList.add('city__city-list_active');
    }

    close() {
      this.selector.classList.remove('city__select_active');
      this.list.classList.remove('city__city-list_active');
    }

    listenSelector() {
      this.selector.addEventListener('click', () => {
      this.open();
      // this.listenCloseBtn();
      this.listenItems();
      })
    }



    listenItems() {
      this.listItems.forEach( elem => {
        // let city = elem;
        elem.addEventListener('click', () => {
          this.cityInput.textContent = elem.dataset.city;
          currentCity = elem.dataset.city;
          localStorage.setItem('city', elem.dataset.city);
          this.close();
        })
      })
    }
  }



  new CitySelectionDesc(citySelector, list, cityItems, cityInput).listenSelector();




 //city choice for mobile

 class CitySelectionMob {
  constructor(selector, input, list, closeBtn, listItems) {
    this.selector = selector;
    this.cityInput = input;
    this.list = list;
    this.listItems = listItems;
    this.closeBtn = closeBtn;
    this.currentCityMob = currentCity;
  }

  open() {
    this.list.classList.add('_active');
  }

  close() {
    this.list.classList.remove('_active');
  }

  listenSelector() {
    this.selector.addEventListener('click', () => {
    this.open();
    this.listenCloseBtn();
    this.listenItems();
    })
  }

  listenCloseBtn() {
    this.closeBtn.addEventListener('click', () => {
      this.close();
    })
  }

  listenItems() {
    this.listItems.forEach( elem => {
      let city = elem;
      elem.addEventListener('click', () => {
        this.cityInput.textContent = city.dataset.city;
        currentCity = city.dataset.city;
        localStorage.setItem('city', city.dataset.city);
        this.close();
      })
    })
  }
}


let selectorMob = document.querySelector('.city__selector_mobile');
let cityInputMob = document.querySelector('.city__city-selected');
let cityListMob = document.querySelector('.city__mobile-list');
let closeBtnMob = document.querySelector('.city__mobile-list__close');
let cityListItemsMob = document.querySelectorAll('.city__list-item');

new CitySelectionMob(selectorMob, cityInputMob, cityListMob, closeBtnMob, cityListItemsMob ).listenSelector();
})
