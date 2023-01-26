import '@/assets/styles/scss/login.scss';

localStorage.getItem('access_token')
  ? (location.href = '/')
  : document.getElementsByTagName('main')[0].classList.remove('d-none');
const formElement: Element = document.getElementsByTagName('form')[0];
const emailInputElem = document.getElementById('username') as HTMLInputElement;
const passwordInputElem = document.getElementById(
  'password',
) as HTMLInputElement;
const emailHelpElem: HTMLElement | null = document.getElementById('email-help');
const loginSubmitBtn: HTMLElement | null = document.querySelector(
  'button[type=submit]',
);

formElement.addEventListener('submit', login);
function login(event?: Event): void {
  event?.preventDefault();

  if (
    !/^[a-zA-Z0-9_.]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/.test(emailInputElem.value)
  ) {
    emailHelpElem?.classList.remove('d-none');
    return;
  }
  emailHelpElem?.classList.add('d-none');
  if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{10,}$/.test(
      passwordInputElem.value,
    )
  ) {
    //do nothing
  }
  //do nothing.. API will auth password
  const defaultLoginText = loginSubmitBtn?.innerText;
  loginSubmitBtn && (loginSubmitBtn.innerText = 'logging in...');
  fetch('https://reqres.in/api/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'eve.holt@reqres.in',
      password: 'cityslicka',
    }),
  })
    .then((res) => res.json() as Promise<{ token: string }>)
    .then(({ token }) => {
      localStorage.setItem('access_token', token);
      localStorage.setItem('email', emailInputElem.value);
      location.href = '/';
    })
    .catch(() => {
      loginSubmitBtn && (loginSubmitBtn.innerText = defaultLoginText as string);
    });
}
