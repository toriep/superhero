import React, { Component } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import _ from "lodash";
import './App.css';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

function generateLayout() {
  return _.map(_.range(0, 25), function(item, i) {
    var y = Math.ceil(Math.random() * 4) + 1;
    return {
      x: (_.random(0, 5) * 2) % 12,
      y: Math.floor(i / 6) * y,
      w: 2,
      h: y,
      i: i.toString(),
      static: Math.random() < 0.05
    };
  });
}

class App extends Component {
  static defaultProps = {
    className: 'main-container',
    rowHeight: 30,
    onLayoutCHange: () => {},
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    initialLayout: generateLayout()
  }
  state = {
    currentBreakpoint: "lg",
    compactType: "vertical",
    mounted: false,
    layouts: { lg: this.props.initialLayout }
  }
  generateDOM () {
    return _.map(this.state.layouts.lg, function(l, i) {
      return (
        <div key={i} className={l.static ? "static" : ""}>
          {l.static ? (
            <span
              className="text"
              title="This item is static and cannot be removed or resized."
            >
              Static - {i}
            </span>
          ) : (
            <span className="text">{i}</span>
          )}
        </div>
      );
    });
  }
  render() {
    return (
      <div className="App">
        <ResponsiveReactGridLayout
          {...this.props}
          layouts={this.state.layouts}
          measureBeforeMount={false}
          useCSSTransforms={this.state.mounted}
          compactType={this.state.compactType}
          preventCollision={!this.state.compactType}
        >
          {this.generateDOM()}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

export default App;
