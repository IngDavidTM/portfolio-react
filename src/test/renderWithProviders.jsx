import { render } from '@testing-library/react';
import { LanguageProvider } from '../context/LanguageContext';

const renderWithProviders = (ui) => render(<LanguageProvider>{ui}</LanguageProvider>);

export default renderWithProviders;
