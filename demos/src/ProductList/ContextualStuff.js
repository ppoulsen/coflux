/*
 * THINGS TO THINK ABOUT
 *  - Testing
 *    should be able to import the file, call it and grab `nativeComponent`
 *      ```js
 *      import productList from '../ProductList';
 *      const ProductList = productList().nativeComponent;
 *      ```
 *
 *  - Components should only be able to modify data they specify, not doing this
 *    would be breaking a best practice
 *      - should this be a best practice?
 *      - Does it work for all use cases?
 */

import React from 'react';
import { wrap } from 'coflux';

function ContextualStuff({ user }) {
  return (
    <div>
      {user.firstName} {user.lastName}
    </div>
  );
}

export default wrap(ContextualStuff, {
  actions: {
  },

  mapStateToProps() {
    return {
      user: 'user',
    }
  },
});
