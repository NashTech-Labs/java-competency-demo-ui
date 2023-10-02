'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">java-competency-demo-ui documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-5c7724086161f5245c923d846e2197d63f5d8111b245f75a5db0b8137d60290dd646bdd445f6564d9cc5e65672d74fe9db43100d3a1e18c957c2154140020a83"' : 'data-bs-target="#xs-components-links-module-AppModule-5c7724086161f5245c923d846e2197d63f5d8111b245f75a5db0b8137d60290dd646bdd445f6564d9cc5e65672d74fe9db43100d3a1e18c957c2154140020a83"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-5c7724086161f5245c923d846e2197d63f5d8111b245f75a5db0b8137d60290dd646bdd445f6564d9cc5e65672d74fe9db43100d3a1e18c957c2154140020a83"' :
                                            'id="xs-components-links-module-AppModule-5c7724086161f5245c923d846e2197d63f5d8111b245f75a5db0b8137d60290dd646bdd445f6564d9cc5e65672d74fe9db43100d3a1e18c957c2154140020a83"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CloudOptionsModule.html" data-type="entity-link" >CloudOptionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-CloudOptionsModule-9e99166410a74e82e7923cc0f5fce8d55dccf131e4e055972b183a4a76d4c5ffc435e41ff08ddabfbc86c0528610220330e44125b5815acaf66060a95099689b"' : 'data-bs-target="#xs-components-links-module-CloudOptionsModule-9e99166410a74e82e7923cc0f5fce8d55dccf131e4e055972b183a4a76d4c5ffc435e41ff08ddabfbc86c0528610220330e44125b5815acaf66060a95099689b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CloudOptionsModule-9e99166410a74e82e7923cc0f5fce8d55dccf131e4e055972b183a4a76d4c5ffc435e41ff08ddabfbc86c0528610220330e44125b5815acaf66060a95099689b"' :
                                            'id="xs-components-links-module-CloudOptionsModule-9e99166410a74e82e7923cc0f5fce8d55dccf131e4e055972b183a4a76d4c5ffc435e41ff08ddabfbc86c0528610220330e44125b5815acaf66060a95099689b"' }>
                                            <li class="link">
                                                <a href="components/TabBarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TabBarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CloudOptionsRoutingModule.html" data-type="entity-link" >CloudOptionsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardModule.html" data-type="entity-link" >DashboardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-DashboardModule-62b47163987e1e3cba527f4b8c4e544750983d066964ad722299edf893bb6c3c7bbcc26edecd5e92695703260c4cb6b14547a53688ff3d985d44861f97f82a22"' : 'data-bs-target="#xs-components-links-module-DashboardModule-62b47163987e1e3cba527f4b8c4e544750983d066964ad722299edf893bb6c3c7bbcc26edecd5e92695703260c4cb6b14547a53688ff3d985d44861f97f82a22"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DashboardModule-62b47163987e1e3cba527f4b8c4e544750983d066964ad722299edf893bb6c3c7bbcc26edecd5e92695703260c4cb6b14547a53688ff3d985d44861f97f82a22"' :
                                            'id="xs-components-links-module-DashboardModule-62b47163987e1e3cba527f4b8c4e544750983d066964ad722299edf893bb6c3c7bbcc26edecd5e92695703260c4cb6b14547a53688ff3d985d44861f97f82a22"' }>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidenavComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SidenavComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardRoutingModule.html" data-type="entity-link" >DashboardRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HomeModule.html" data-type="entity-link" >HomeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-HomeModule-d06da515fecfd6c359f99fc653d8306c02655b61caf0c818fa3b125550e13ce2af3b26c0afb0b5ae08e77da20e7857c2eeeaf05e63ca8e90af50e0ec69abe12c"' : 'data-bs-target="#xs-components-links-module-HomeModule-d06da515fecfd6c359f99fc653d8306c02655b61caf0c818fa3b125550e13ce2af3b26c0afb0b5ae08e77da20e7857c2eeeaf05e63ca8e90af50e0ec69abe12c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomeModule-d06da515fecfd6c359f99fc653d8306c02655b61caf0c818fa3b125550e13ce2af3b26c0afb0b5ae08e77da20e7857c2eeeaf05e63ca8e90af50e0ec69abe12c"' :
                                            'id="xs-components-links-module-HomeModule-d06da515fecfd6c359f99fc653d8306c02655b61caf0c818fa3b125550e13ce2af3b26c0afb0b5ae08e77da20e7857c2eeeaf05e63ca8e90af50e0ec69abe12c"' }>
                                            <li class="link">
                                                <a href="components/CarBrandsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CarBrandsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CarsListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CarsListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CarsdataCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CarsdataCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DataNotFoundComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DataNotFoundComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PageNotFoundComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PageNotFoundComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeRoutingModule.html" data-type="entity-link" >HomeRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link" >MaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SharedModule-656665ab5a8e749460f4bd360503af2c0839d52888deb6f2a56893b0e5268d6c88f7dde5cf4a8d7dfa065babcae8cabbfbe98e68bf6bbf7d0ba37a29c95c2d40"' : 'data-bs-target="#xs-components-links-module-SharedModule-656665ab5a8e749460f4bd360503af2c0839d52888deb6f2a56893b0e5268d6c88f7dde5cf4a8d7dfa065babcae8cabbfbe98e68bf6bbf7d0ba37a29c95c2d40"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-656665ab5a8e749460f4bd360503af2c0839d52888deb6f2a56893b0e5268d6c88f7dde5cf4a8d7dfa065babcae8cabbfbe98e68bf6bbf7d0ba37a29c95c2d40"' :
                                            'id="xs-components-links-module-SharedModule-656665ab5a8e749460f4bd360503af2c0839d52888deb6f2a56893b0e5268d6c88f7dde5cf4a8d7dfa065babcae8cabbfbe98e68bf6bbf7d0ba37a29c95c2d40"' }>
                                            <li class="link">
                                                <a href="components/TableHeadersDropdownComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TableHeadersDropdownComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TabularViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TabularViewComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/CloudOptionsComponent.html" data-type="entity-link" >CloudOptionsComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/CarsListService.html" data-type="entity-link" >CarsListService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AvailableCloudOptions.html" data-type="entity-link" >AvailableCloudOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CarBrand.html" data-type="entity-link" >CarBrand</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CarDetails.html" data-type="entity-link" >CarDetails</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});