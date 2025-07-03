import React from "react";
import Image from "next/image";
export default function About() {
  return (
    <>
      <section className="flat-spacing-23 flat-image-text-section">
        <div className="container">
          <div className="tf-grid-layout md-col-2 tf-img-with-text style-4">
            <div className="tf-image-wrap">
              <Image
                className="lazyload w-100"
                data-src="/images/about-us.jpg"
                alt="collection-img"
                src="/images/about-us.jpg"
                width={600}
                height={499}
              />
            </div>
            <div className="tf-content-wrap px-0 d-flex justify-content-center w-100">
              <div>
                <div className="heading">BROOKLYN PHONES </div>
                <div className="text">
                  est spécialisée dans la vente en gros et au détail de téléphones
                  mobiles et de leurs accessoires. Elle offre à tous ces clients le meilleur service.
                  Chez BROOKLYN, nous sommes guidés par un ensemble de valeurs essentielles. La
                  confiance, l'honnêteté, l'engagement, le respect, l'intégrité, la responsabilité et la
                  collaboration. Ces valeurs sont au cœur de notre culture d'entreprise et influencent
                  toutes nos actions et décisions.

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="flat-spacing-15">
        <div className="container">
          <div className="tf-grid-layout md-col-2 tf-img-with-text style-4">
            <div className="tf-content-wrap px-0 d-flex justify-content-center w-100">
              <div>
                <div className="heading">Our mission</div>
                <div className="text">
                  Our mission is to empower people through sustainable fashion.
                  <br className="d-xl-block d-none" />
                  We want everyone to look and feel good, while also doing our
                  part to <br className="d-xl-block d-none" />
                  help the environment.We believe that fashion should be
                  stylish, <br className="d-xl-block d-none" />
                  affordable and accessible to everyone. Body positivity and
                  inclusivity <br className="d-xl-block d-none" />
                  are values that are at the heart of our brand.
                </div>
              </div>
            </div>
            <div className="grid-img-group">
              <div className="tf-image-wrap box-img item-1">
                <div className="img-style">
                  <Image
                    className="lazyload"
                    src="/images/collections/collection-71.jpg"
                    data-=""
                    alt="img-slider"
                    width={337}
                    height={388}
                  />
                </div>
              </div>
              <div className="tf-image-wrap box-img item-2">
                <div className="img-style">
                  <Image
                    className="lazyload"
                    src="/images/collections/collection-70.jpg"
                    data-=""
                    alt="img-slider"
                    width={400}
                    height={438}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
}
