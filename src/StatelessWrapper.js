import React, { PropTypes } from 'react';
import { store as state, loadedForPath } from './Store';
import crawlObject from './crawlObject';
import bindActions from './bindActions';
import updateState from './updateState';

// bind actions correctly
export default function StatelessWrapper(props, context):React.DOM {
  const {
    fetch,
    Component,
    componentProps,
    actions,
    loadingDOM,
    mapStateToProps,
  } = props;

  const stateToProps:Object = mapStateToProps(context);
  const propsForComponent:Object = {};
  let boundActions:?Object = actions;

  for (const key:string in stateToProps) {
    // TODO  figure out when to fetch and when to not fetch
    // maybe something like on initial load check the store to see if it was provided
    // initially?
    propsForComponent[key] = crawlObject(context.store, stateToProps[key]);

    const propValue:any = propsForComponent[key];

    // TODO
    if (!propValue || (Array.isArray(propValue) && !propValue.length)) {
      fetch(context).then(data => {
        loadedForPath(key);
        updateState(
          mapStateToProps.bind(null, context),
          data
        );
      });

      return loadingDOM && loadingDOM();
    }
  }

  /*
   * multiple re-renders might cause things to be rebound
   */
  if (actions && !actions._bound) {
    boundActions = bindActions(actions, props, context, propsForComponent);
    actions._bound = true;
  }

  return (
    <Component {...componentProps} {...propsForComponent} actions={boundActions} />
  );
}

StatelessWrapper.contextTypes = {
  store: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
}
