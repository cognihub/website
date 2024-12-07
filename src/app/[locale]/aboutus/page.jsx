import { Icon } from '@iconify/react'
import { unstable_setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import Members from './components/Members'

import styles from './About.module.css'

export default async function Page({ params: { locale } }) {
    unstable_setRequestLocale(locale)

    return (
        <div className={styles.AboutUsPageContainer}>
            <div className={styles.IntroductoryContainer}>
                <h2>Λίγα λόγια για εμάς</h2>
                <p>
                    Το CogniHub είναι μία εθελοντική ομάδα με στόχο την ενδυνάμωση νέων ατόμων
                    στα δυναμικά πεδία της Πληροφορικής, Ψυχολογίας, Γλωσσολογίας, Βιολογίας
                    και Φιλοσοφίας. Μέσω δραστηριοτήτων σκοπεύουμε να συμβάλλουμε στην
                    καλλιέργεια της διεπιστημονικής σκέψης και στην γεφύρωση του χάσματος
                    μεταξύ του ακαδημαϊκού τομέα και της αγοράς εργασίας στην Ελλάδα.

                    Οι <strong>δραστηριότητές</strong> μας περιλαμβάνουν:
                </p>
                <ul>
                    <li>💡 Συζητήσεις & συνεντεύξεις</li>
                    <li>💡 Podcasts</li>
                    <li>💡 Workshops</li>
                    <li>💡 Εκπαιδευτικά βίντεο</li>
                    <li>💡 Συνεδρίες mentoring</li>
                    <li>💡 Παρουσιάσεις ερευνητικών εργασιών</li>
                </ul>
                <p>
                    Οι <strong>στόχοι</strong> του CogniHub στο σε σχέση με το Ελληνικό
                    ακαδημαϊκό και εργασιακό περιβάλλον είναι:
                </p>
                <ul>
                    <li>
                        🧠 Η ενίσχυση των δεξιοτήτων φοιτητών και νέων ατόμων σε σχέση με τους
                        παραπάνω τομείς.
                    </li>
                    <li>
                        🧠 Η παροχή ερεθισμάτων και ώθησης με στόχο την καθοδήγηση σε μια
                        διεπιστημονική καριέρα.
                    </li>
                    <li>
                        🧠 Η δημιουργία μιας πλατφόρμας με στόχο την ανάδειξη νέων επιστημών,
                        καθώς και ανθρώπων που εργάζονται στον ευρύτερο χώρο της γνωσιακής
                        επιστήμης.
                    </li>
                    <li>🧠 Η δικτύωση και η δημιουργία ενός advisory board.</li>
                    <li>
                        🧠 Η καλλιέργεια μιας διεπιστημονικής κοινότητας με απώτερο σκοπό την
                        συνεχή ανταλλαγή ιδεών και γνώσης.
                    </li>
                    <li>
                        🧠 Η δημιουργία μιας υγιούς κοινότητας ανθρώπων που αγαπούν τη γνωσιακή
                        επιστήμη και τη διεπιστημονικότητα.
                    </li>
                </ul>
            </div>

            <h2>Το CogniHub μέσα από τις δράσεις μας</h2>
            <div className={styles.CognihubEventsContainer}>
                <div className={styles.CognihubEventsTextAndActionsContainer}>
                    <p>
                        Είμαστε πάντα ανοιχτοί σε συνεργασίες ή σε πιθανές προτάσεις σας.
                        Περισσότερες πληροφορίες σχετικά με τις δράσεις μπορείτε να βρείτε
                        παρακάτω:
                    </p>
                    <div className={styles.CognihubEventsActionsContainer}>
                        <Link href='/cooperate'>
                            <div className={styles.ActionsContainer}>
                                <Image src='/cooperation.png' alt='Cooperate icon' width={60} height={60} />
                                <p>Ας συνεργαστούμε</p>
                            </div>
                        </Link>
                        <Link href='/events-guide'>
                            <div className={styles.ActionsContainer}>
                                <Image src='/user-guide.png' alt='User guide icon' width={60} height={60} />
                                <p>Οδηγός Δράσεων</p>
                            </div>
                        </Link>
                        <Link href='/events'>
                            <div className={styles.ActionsContainer}>
                                <Icon icon='streamline-emojis:calendar' width={60} />
                                <p>Όλες οι δράσεις</p>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className={styles.EventExamplesCollage}>
                    <div className={styles.Event1} />
                    <div className={styles.Event2} />
                    <div className={styles.Event3} />
                    <div className={styles.Event4} />
                </div>
            </div>

            <h2>Η ομάδα μας</h2>
            <p>
                Η ομάδα μας απαρτίζεται από ανθρώπους πολλών διαφορετικών τομέων και
                κατευθύνσεων.

                Αν ενδιαφέρεσαι να γίνεις μέλος <Link className='primaryLink' href='/becomemember'>συμπλήρωσε την φόρμα</Link>!
            </p>
            <Members />
        </div>
    )
}
