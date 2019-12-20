import styles from './styles.css'
import React, { useState, createRef } from "react";
import PropTypes from 'prop-types';
import { arc, scaleLinear} from 'd3'
import rmc from "random-material-color";
import * as utils from "./utils";

const Sunburst = props => {
    const data = props.data
    const { width, height, radius, donutRadius } = props.dimentions;

    const [svgRef, percentageRef, detailsRef] = [...Array(3)].map(createRef);

    const handleMouseOver = e => {
        const path = e.target.getAttribute("data-path"),
            name = e.target.getAttribute("data-name"),
            size = e.target.getAttribute("data-value"),
            total = svgRef.current.getAttribute("data-total"),
            slices = svgRef.current.querySelectorAll(`path.slice:not([data-path^='${path}'])`),
            n = slices.length;

        let i = -1;

        while(++i < n) 
            slices[i].style.opacity = "0.3";

        detailsRef.current.textContent = name;
        percentageRef.current.textContent = `${(size * 100 / total).toFixed(2)}%`;
    };

    const handleMouseOut = e => {
        const slices = svgRef.current.querySelectorAll("path.slice");

        let i = -1,
            n = slices.length;

        while(++i < n) 
            slices[i].style.opacity = "1";

        detailsRef.current.textContent = "";
        percentageRef.current.textContent = "";
    };

    const transform = `translate(${width * 0.45},${0.55 * height})`,
        slices = utils.flatten(utils.findSum(data)),
        scale = scaleLinear().domain([0, slices[0].size]).range([0, 2 * Math.PI]),
        shape = arc(),
        depth = utils.depth(data),
        arcWidth = (radius - donutRadius)/depth;

    let currentStartAngle = 0
        ,currentLevel = 1
        // ,levelStartAngle = [0];

    return (
        <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`} data-total={slices[0].size}>
            <g transform={transform}>
            {slices.map((slice, i) => {
                const { level,
                    // name,
                    // size
                     } = slice,
                    startAngle = currentStartAngle,
                    endAngle = startAngle + scale(slice.size),
                    innerRadius = (slice.level - 1) * arcWidth,
                    outerRadius = innerRadius + arcWidth;

                if (slices[i + 1] && (slices[i + 1].level <= level)) {
                    currentStartAngle = endAngle;
                }

                currentLevel = (slice.level);

                return (
                    <path className="slice" data-path={slice.path}
                        data-value={slice.size}
                        data-name={slice.name}
                        display={i === 0 ? "none" : "inline"}
                        fill={rmc.getColor()}
                        onMouseOver={handleMouseOver} 
                        d={shape({
                            startAngle,
                            endAngle,
                            innerRadius,
                            outerRadius
                        })}
                        onMouseOut={handleMouseOut}>
                            <title>{`${slice.name}\n${slice.size}`}</title>
                    </path>
                );
            })}
            </g>
            <text transform={transform} ref={detailsRef} textAnchor="middle" className="details" dy={-10}/>
            <text transform={transform} ref={percentageRef} textAnchor="middle" className="details-percentage" dy={10}/>
        </svg>
    );
};

Sunburst.defaultProps = {
    data: {},
    dimentions: {
        width : 600, 
        height : 600, 
        radius : 400, 
        donutRadius : 100
    }
};

Sunburst.propTypes = {
    data: PropTypes.object.isRequired,
    dimentions: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number,
        radius: PropTypes.number,
        donutRadius: PropTypes.number
    })
};

export default Sunburst;