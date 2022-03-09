import Head from 'next/head';
import React, { useEffect, useState } from 'react';
var title = '';
var i = 0;
const arrtitle = [
  '|',
  '/',
  '-',
  '\\',
  'F',
  'F|',
  'F/',
  'F-',
  'F\\',
  'Fo',
  'Fo|',
  'Fo/',
  'Fo-',
  'Fo\\',
  'For',
  'For|',
  'For/',
  'For-',
  'For\\',
  'Form',
  'Form|',
  'Form/',
  'Form-',
  'Form\\',
  'Formi',
  'Formi|',
  'Formi/',
  'Formi-',
  'Formi\\',
  'Formig',
  'Formig|',
  'Formig/',
  'Formig-',
  'Formig\\',
  'Formiga',
];
const TitleChanger: React.FC = ({ children }) => {
  const [title, settitle] = useState('');
  const UpdateTitle = () => {
    if (i < arrtitle.length) {
      settitle(arrtitle[i]);
      i++;
      setTimeout(UpdateTitle, 500);
    } else {
      i = 0;
      UpdateTitle();
    }
  };
  useEffect(() => {
    UpdateTitle();
  }, []);

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </div>
  );
};

export default TitleChanger;
