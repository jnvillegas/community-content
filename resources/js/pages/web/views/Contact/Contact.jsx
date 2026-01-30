import styles from './Contact.module.css';
import WebLayout from '../../layout';
import Banner from '../../components/Banner/Banner';

const Contact = () => {
    return (
        <div>
            <Banner title={'Contato'} />
            <h1>Contact Page</h1>
        </div>
    );
};

Contact.layout = page => <WebLayout>{page}</WebLayout>

export default Contact;