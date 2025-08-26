class PageFactory {
  static navigateToPage(pageName) {
    cy.fixture('routes').then((routes) => {
      const route = routes[pageName];
      if (!route) {
        throw new Error(`Route for page "${pageName}" is available.`);
      }
      cy.visit(route);
    });
  }
}

export default PageFactory;