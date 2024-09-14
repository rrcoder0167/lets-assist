"use client"

import * as React from "react";
import Image from "next/image";

interface Props {
  title: string
  description: string
  src: string
  alt: string
  keyword?: string
  width?: number
  height?: number
  className?: string
}

export default class DisplayCard extends React.Component<Props> {
  constructor(props : Props) {
    super(props)
  }
  render() {
    return (
      <div>
        {typeof this.props.className !== "undefined" ? (
          <div className={this.props.className + " mx-5"}>
            <h3 className="section-header">
              {this.props.title}
              {typeof this.props.keyword !== "undefined" ? (
                <span className="keyword">{this.props.keyword}</span>
              ) : (
                <p></p>
              )}
            </h3>
            <p className="text-sm">{this.props.description}</p>
            {typeof this.props.height !== "undefined" &&
            typeof this.props.width !== "undefined" ? (
              <Image
                src={this.props.src}
                alt={this.props.alt}
                width={this.props.width}
                height={this.props.height}
              />
            ) : (
              <Image src={this.props.src} alt={this.props.alt} width={500} height={300} />
            )}
          </div>
        ) : (
          <div className="mx-5">
            <h3 className="section-header">
              {this.props.title}
              {typeof this.props.keyword !== "undefined" ? (
                <span className="keyword">{this.props.keyword}</span>
              ) : (
                <p></p>
              )}
            </h3>
            <p className="text-sm">{this.props.description}</p>
            {typeof this.props.height !== "undefined" &&
            typeof this.props.width !== "undefined" ? (
              <Image
                src={this.props.src}
                alt={this.props.alt}
                width={this.props.width}
                height={this.props.height}
              />
            ) : (
              <Image src={this.props.src} alt={this.props.alt} width={500} height={300} />
            )}
          </div>
        )}
      </div>
    );
  }
}