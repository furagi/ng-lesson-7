import { ReactiveFormsPage } from './app.po';

describe('reactive-forms App', () => {
  let page: ReactiveFormsPage;

  beforeEach(() => {
    page = new ReactiveFormsPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
