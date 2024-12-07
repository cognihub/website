'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import config from '@/lib/config.js'

import styles from './MentorHub.module.css'

const MAX_CHARACTERS = 350

const MENTORS = [
    {
        'img': '/mentors/cropped_kyriaki.png',
        'name': 'Κυριακή Νεοφύτου',
        'description': 'Η Κυριακή Νεοφύτου είναι <strong>μεταδιδακτορική ερευνήτρια</strong> στο <strong>Language Neuromodulation Lab</strong> στο Τμήμα Νευρολογίας, στο <strong>Johns Hopkins Medicine</strong>. Έλαβε το διδακτορικό της το 2023 από το Τμήμα Γνωσιακής Επιστήμης του Πανεπιστημίου Johns Hopkins. Η δουλειά της επικεντρώνεται στις γλωσσικές ικανότητες των ατόμων με αφασία και στόχος είναι να αποκτήσει μια εικόνα για το πώς επηρεάζονται οι γνωσιακές ικανότητες σε τέτοιες περιπτώσεις, τι μπορεί να μας πει αυτό για τα νευρικά υποστρώματα που υποστηρίζουν τη γνωσιακή λειτουργία, και πώς μπορούμε να χρησιμοποιήσουμε αυτές τις πληροφορίες για τη βελτιστοποίηση της διάγνωσης και της θεραπείας αυτών των ασθενών. Στις μελέτες της χρησιμοποιεί δεδομένα συμπεριφοράς και νευροαπεικόνισης, όπως Diffusion Tensor Imaging (DTI). Είναι κάτοχος μεταπτυχιακού τίτλου στην Έρευνα στη Γλωσσολογία από το Πανεπιστήμιο της Ουτρέχτης και έχει ερευνητική εκπαίδευση από το Neuroscience of Language Lab στο Πανεπιστήμιο της Νέας Υόρκης του Άμπου Ντάμπι, με ειδίκευση στη Μαγνητοεγκεφαλογραφία (MEG). Έχει δημοσιεύσει άρθρα σε διάφορα επιστημονικά περιοδικά και έχει επίσης παρουσιάσει τη δουλειά της σε διάφορα συνέδρια διεθνώς. Έχει λάβει υποτροφία διδακτορικών σπουδών από το Ίδρυμα Ωνάση και έχει κερδίσει πολλά άλλα βραβεία και υποτροφίες όλα αυτά τα χρόνια.',
    },
    {
        'img': '/mentors/cropped_maria.png',
        'name': 'Μαρία Γεωργία Ζαχαρή',
        'description': 'Η Μαρία είναι <strong>Senior Language Engineer και Technical Lead</strong> σε Conversational AI projects στην <strong>Omilia - Conversational Intelligence</strong>. Διαθέτει 5+ χρόνια εμπειρίας στην Κατανόηση Φυσικής Γλώσσας (NLU), Dialog Management, UX/UI Conversation Design & Business Requirements Collection. Η Μαρία έχει επίσης πτυχίο Αγγλικής Γλώσσας & Φιλολογίας από το Πανεπιστήμιο Αθηνών και μεταπτυχιακό στη Θεωρητική & Εφαρμοσμένη Γλωσσολογία από το Πανεπιστήμιο του Cambridge, όπου εστίασε στη Σημασιολογία, Πραγματολογία και Ψυχογλωσσολογία. Περήφανη που ξεκίνησε το ταξίδι της από τις ανθρωπιστικές επιστήμες και την εκπαίδευση, η Μαρία έκανε ένα άλμα σε μια θέση που απαιτεί υψηλή τεχνολογική κατάρτιση και επαφή με πελάτες. Ενδιαφέρεται για ό,τι συνδυάζει τον κόσμο των ανθρωπιστικών επιστημών με την τεχνολογία, αλλά κυρίως για: Διαλογικά Συστήματα, NLU, Customer Experience, Generative AI & LLMs αλλά και Ηθική στην Τεχνητή Νοημοσύνη και Τεχνητή Νοημοσύνη στην Εκπαίδευση.',
    },
    {
        'img': '/mentors/cropped_lilian.png',
        'name': 'Λίλιαν Μπαλατσού',
        'description': 'Η Δρ. Λίλιαν Μπαλατσού είναι <strong>Γνωσιακή Νευροεπιστήμων, Ειδικός Τεχνητής Νοημοσύνης και Γλώσσας και ιδρύτρια του Greek Girls Code</strong>. Έχει μελετήσει εκτενως τον ανθρώπινο εγκέφαλο και τη γλώσσα κατά την επεξεργασία ερεθισμάτων και την ομιλία και τα τελευταία χρόνια εργάζεται στο χώρο της Τεχνητής Νοημοσύνης (ΑΙ). Είναι μέντορας και κεντρική ομιλήτρια για τη διεπιστημονικότητα, την τεχνητή νοημοσύνη και την επιφάνεια τον γυναικών στο STEM.',
    },
    {
        'img': '/mentors/cropped_eleni.png',
        'name': 'Ελένη Τσαπρούνη',
        'description': 'Η Ελένη Τσαπρούνη είναι <strong>υποψήφια διδάκτωρ Ψυχογλωσσολογίας & Νευρογλωσσολογίας</strong> στο <strong>Πανεπιστήμιο της Λιουμπλιάνας</strong>. Το ενδιαφέρον και το ταξίδι της στο χώρο της Γλωσσολογίας ξεκίνησε από τα φοιτητικά της χρόνια, όταν επέλεξε την ειδίκευση της Γλωσσολογίας του τμήματος Φιλολογίας του ΑΠΘ. Στη συνέχεια έκανε μεταπτυχιακό (ΜΑ) στις Γλωσσικές Διαταραχές και έπειτα ακολούθησε το διδακτορικό της (PhD), με το οποίο ασχολείται μέχρι και σήμερα. Τα επιστημονικά της ενδιαφέροντα σχετίζονται με τη γλωσσική επεξεργασία και τον τρόπο με τον όποιο προσλαμβάνεται η γλωσσική πληροφορία. Για τις ανάγκες της έρευνας της και την ανάλυση των δεδομένων της χρησιμοποιεί τη μέθοδο νευροαπεικόνισης EEG (Electroencephalography), τη γλώσσα προγραμματισμού R και την πλατφόρμα MATLAB.',
    }
]

function CollapsibleText({ paragraph }) {
    const [displayedText, setDisplayedText] = useState('')
    const [isCollapsed, setIsCollapsed] = useState(false)

    useEffect(() => {
        collapseText(MAX_CHARACTERS)
    }, [])

    const collapseText = (textSize) => {
        setDisplayedText(paragraph.substring(0, textSize))
        setIsCollapsed(!isCollapsed)
    }

    const expandText = () => {
        setDisplayedText(paragraph)
        setIsCollapsed(!isCollapsed)
    }

    return (
        <>
            <p dangerouslySetInnerHTML={{ __html: displayedText + (isCollapsed ? '...' : '') }} />
            {
                !isCollapsed
                    ? <button onClick={() => collapseText(MAX_CHARACTERS)}>ΛΙΓΟΤΕΡΑ</button>
                    : <button onClick={expandText}>ΠΕΡΙΣΣΟΤΕΡΑ</button>
            }
        </>
    )
}

// Images can be cropped from: https://circlecropimage.com/
export default function Page() {
    return (
        <div className={styles.MentorHubContainer}>
            <h2>MentorHub</h2>

            <p>
                Είσαι φοιτητής ή νέος απόφοιτος; Σε ενδιαφέρει μια διεπιστημονική καριέρα και δεν ξέρεις πώς να ξεκινήσεις; Θα μπορούσες να αξιοποιήσεις τις συμβουλές νέων ατόμων με ουσιαστική επαγγελματική εμπειρία.
            </p>

            <p>
                <strong>
                    Το MentorHub σε φέρνει σε επαφή με νέα άτομα που εργάζονται στους τομείς της πληροφορικής,
                    της ψυχολογίας, της γλωσσολογίας, της βιολογίας και της φιλοσοφίας, εστιάζοντας στη διεπιστημονικότητα
                    και τις εναλλακτικές επαγγελματικές διεξόδους.
                </strong>
            </p>

            <p>
                Στόχος του mentorship είναι η παροχή καθοδήγησης και πρακτικών συμβουλών στους mentees, στα πρώτα τους επαγγελματικά βήματα.
                Ξεκινώντας με τον τομέα της Γλωσσολογίας, και εισάγοντας σταδιακά και τους υπόλοιπους τομείς, σε προσκαλούμε να γνωρίσεις τις πρώτες τέσσερεις μέντορες, κάθε μία από τις οποίες είναι έμπειρη επαγγελματίας στον τομέα της.
            </p>

            <p>
                Ενδιαφέρεσαι να συμμετάσχεις; Τα βήματα είναι απλά:
            </p>

            <ol>
                <li>
                    Επίλεξε τον μέντορα σου ταιριάζει περισσότερο
                </li>
                <li>
                    <Link className='primaryLink' href={config.forms.mentorHub} target='_blank'>
                        Συμπλήρωσε την φόρμα εκδήλωσης ενδιαφέροντος
                    </Link>
                </li>
                <li>
                    Μέσα σε λίγες ημέρες θα επικοινωνήσουμε μαζί σου, για να σε φέρουμε σε επαφή με τον κατάλληλο μέντορα
                </li>
            </ol>

            <h2>Οι μέντορες</h2>
            <div className={styles.MentorsContainer}>
                {MENTORS.map((mentor) => (
                    <div className={styles.MentorContainer}>
                        <div className={styles.MentorImgContainer}>
                            <Image src={mentor.img} fill alt='Mentor Image' />
                        </div>
                        <div className={styles.MentorInfoContainer}>
                            <div className={styles.MentorTitle}>
                                {mentor.name}
                            </div>
                            <CollapsibleText paragraph={mentor.description} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
