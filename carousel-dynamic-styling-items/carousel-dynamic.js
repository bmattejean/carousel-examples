const React = require('preact')
const { insertAfter, restoreAll } = require('@qubit/utils')()
const Glide = require('@glidejs/glide').default
const { useState } = require('preact/hooks')

module.exports = function variation(options) {
  const recs = []
  const target = <div /> //HTML Element ot insert

  displayCarousel()

  function displayCarousel() {
    options.onRemove(restoreAll)
    const experienceContainer = document.createElement('div')
    insertAfter(target, experienceContainer)
    renderCarousel(experienceContainer)
  }

  function renderCarousel(experienceContainer) {
    let perView;
    let styling;

    if (recs.length <= 5) {
      perView = recs.length
    } else {
      perView = 5
    }
    
    if(recs.length === 1) {
      styling = "width:40%padding-left:30%"
    } else if (recs.length === 2) {
      styling = "width:40%;padding-left:30%;"
    } else if (recs.length === 3) {
      styling = "width:60%;padding-left:20%;"
    } else if (recs.length === 4) {
      styling = "width:80%;padding-left:10%;"
    } else {
      styling = "width:90%;padding-left:5%;"
    }
    
    React.render(
      <div id="expContainer" style={styling}>
        <div id='glide' className='RecsContainer'>
          <h3 className='RecsContainer-headline'>You've recently seen</h3>
          <div className='RecsContainer-carousel' data-glide-el='track'>
            <ul className='RecsContainer-slides glide__slides'>
              {recs.map(product => (
                <Product product={product} key={product.id}/>
              ))}
            </ul>
          </div>
        
        <div class="glide__arrows" data-glide-el="controls">
          <button id="prevButton" class='arrow left RecsContainer-arrow RecsContainer-arrow_left' data-glide-dir='<' style="background: transparent;"/>
          <button id="nextButton" class='arrow right RecsContainer-arrow RecsContainer-arrow_left' data-glide-dir='>'style="background: transparent;"/>
        </div>
      </div>
    </div>,
      experienceContainer
    )

    const glide = new Glide('#glide', {
      bound: true,
      perView,
      breakpoints: {
        700: {
          perView: recs.length > 1 ? 2 : 1
        },
        900: {
          perView: recs.length > 2 ? 3 : recs.length
        },
        1050: {
          perView: recs.length > 3 ? 4 : recs.length
        }
      },
      gap: 0,
      type: 'carousel'
    })

    glide.mount()
    
    document.getElementById("prevButton").addEventListener("click", function(){
      glide.go('<');
    });
    document.getElementById("nextButton").addEventListener("click", function(){
      glide.go('>');
    });
  }

  function Product(props) {
    const [color, setColor] = useState('#F27063')

    return (
        <li className='RecsContainer-product glide__slide'>
          <div id='product-recently-viewed'>
            <a href={url}>
              <img className='RecsContainer-productImg' src={imageUrl} />
            </a>
          </div>
          <div className='RecsContainer-textWrap'>
            <span className='RecsContainer-productPrice'>{price}</span>

            <button
              class='AddToWishlistButton'
            >
              <svg
                id={iconId}
                data-qa='heart-icon'
                class='heart-icon___1t2kM product-details__wishlist-icon___2vjZR'
                width='22'
                height='19'
                viewBox='0 0 22 19'
                fill={color}
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M12.9119 1.88259C13.7244 1.34984 14.6718 1.05487 15.6455 1.0315C17.8149 0.781349 19.8734 2.04182 20.6199 4.07739C20.8646 4.76799 20.9859 5.49564 20.9784 6.2276C20.8204 8.16665 19.9036 9.96739 18.4241 11.2446L10.9718 18.1429L3.54571 11.2445C2.8614 10.6439 2.28546 9.93194 1.84269 9.13918C1.29805 8.26315 1.00377 7.25676 0.991311 6.22767C0.760226 4.07363 2.06196 2.04742 4.12812 1.34508C4.84024 1.13243 5.58045 1.02674 6.32414 1.03152C7.73031 1.16989 9.05983 1.73274 10.1333 2.64413C10.4343 2.87833 10.7188 3.13273 10.9848 3.40554C11.5699 2.83049 12.216 2.31987 12.9119 1.88259Z'
                  stroke='black'
                  stroke-width='1.2'
                />
              </svg>
            </button>
          </div>
        </li>
    )
  }
}
