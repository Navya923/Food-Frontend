import products from '../products';

export default function filterList(arr, method) {

    if(method == null) return products;

    else {
          return products.filter(product => {
          const resturantArray = product.resturant.split(" ");
          if(arr.length > 0) {
                    if(resturantArray.some(r => arr.indexOf(r) >= 0)) {
                    return product;
            }
          }
          else {
              return products;
          }
        
      })  
    }
}

