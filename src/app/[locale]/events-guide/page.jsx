import EventCategoryCard from './components/EventCategoryCard'

import styles from './EventsGuide.module.css'

const EVENT_CATEGORIES = [
    {
        categoryTitle: 'Επικοινωνία Επιστήμης',
        categoryDescription: 'Αν είσαι προπτυχιακός, μεταπτυχιακός ή διδακτορικός φοιτητής/φοιτήτρια και προέρχεσαι από σχολές της Γνωσιακής Επιστήμης (Φιλοσοφία, Πληροφορική, Βιολογία, Ψυχολογία, Γλωσσολογία, Μουσικολογία, Νευροεπιστήμη, είτε συνδυασμός αυτών των επιστημονικών κλάδων με άλλους) ή απλώς έχεις ενδιαφέρον για κάποιο αντικείμενο που υπάγεται στο ευρύτερο φάσμα της Γνωσιακής Επιστήμης.',
        eventTypes: [
            {
                title: 'Ιδεοθύελλα',
                description: '«Ιδεοθύελλα» is the new Brainstorming! Η «Ιδεοθύελλα» είναι το podcast του CogniHub, στο οποίο νέοι επιστήμονες και ειδικοί συζητούν για ενδιαφέροντα θέματα γύρω από τις Γνωσιακές Επιστήμες, την διεπιστημονικότητα, την Επικοινωνία της Επιστήμης, καθώς και τις εμπειρίες τους από τον ακαδημαϊκό/ερευνητικό ή επαγγελματικό χώρο. Τα επεισόδια της «Ιδεοθύελλας» είναι διαθέσιμα στο κανάλι μας στο YouTube και στο Spotify.',
                example: 'https://firebasestorage.googleapis.com/v0/b/cognihub-8093e.appspot.com/o/events_banners%2F9e0db027-cc8b-40bb-ba3a-139af4cf43a5?alt=media&token=38674ea5-66ab-4612-9497-658673584b32',
                anchorId: 'is',
                href: '/events?categories=Ιδεοθύελλα',
                imgSource: '/ideastorm.png'
            },
            {
                title: 'Ο Άνθρωπος πίσω από τον Επιστήμονα',
                description: 'Έχεις αναρωτηθεί ποτέ ποιος είναι «Ο Άνθρωπος πίσω από τον Επιστήμονα»; Τι σημαίνει να είναι κανείς ερευνητής/ερευνήτρια, πώς ξεκίνησε η αγάπη για την έρευνα και τι δυσκολίες αντιμετώπισε σε αυτή την πορεία; Μέσα από συνεντεύξεις με επιστήμονες, θα απαντήσουμε σε αυτά και άλλα πολλά ερωτήματα, καταρρίπτοντας στερεότυπα γύρω από την έρευνα και προβάλλοντας την προσωπικότητα των επιστημόνων. Τα επεισόδια του «Ανθρώπου πίσω από τον Επιστήμονα» προβάλλονται στο κανάλι μας στο YouTube και στο Spotify.',
                example: 'https://firebasestorage.googleapis.com/v0/b/cognihub-8093e.appspot.com/o/events_banners%2F07d2a162-2778-45e9-8973-6077e3cfa04d?alt=media&token=e57c9abf-0f53-4be5-a920-b194d04ffb9e',
                anchorId: 'hbs',
                href: '/events?categories=Ο Άνθρωπος πίσω από τον Επιστήμονα',
                imgSource: '/hbs.png'
            }
        ],
        anchorId: 'interdisciplinarity'
    },
    {
        categoryTitle: 'Εκπαίδευση',
        categoryDescription: 'Είμαι καθηγητής, ερευνητής ή εργαζόμενος πάνω σε κάποιο αντικείμενο που σχετίζεται με τη Γνωσιακή Επιστήμη.',
        eventTypes: [
            {
                title: 'Πες το Απλά',
                description: '“Πες το Απλά!” Μια σειρά από ολιγόλεπτα βίντεο, στα οποία παρουσιάζονται επιστημονικές δημοσιεύσεις με απλό τρόπο. Επιχειρούμε να κάνουμε την επιστήμη πιο προσιτή, επεξηγώντας δυσνόητες έννοιες μέσα από αφήγηση και animation. Συγχρόνως, αναδεικνύουμε το έργο επιστημόνων που ζουν και εργάζονται στην Ελλάδα, και είναι ερευνητικά ενεργοί με σημαντικό έργο να παρουσιάσουν.',
                example: 'https://firebasestorage.googleapis.com/v0/b/cognihub-8093e.appspot.com/o/other%2F%CE%A0%CE%B5%CF%82%20%CF%84%CE%BF%20%CE%91%CF%80%CE%BB%CE%AC!.png?alt=media&token=764d9d5f-0e90-45ca-913c-5c4dc0ddf834',
                anchorId: 'ds',
                href: '/events?categories=Πες το Απλά',
                imgSource: '/kiss.png'
            },
            {
                title: 'Παρουσιάσεις φοιτητών και νέων ερευνητών',
                description: 'Στη νέα μας δράση «Παρουσιάσεις φοιτητών και νέων ερευνητών», φοιτητές/τριες και νέοι ερευνητές/τριες από διάφορους επιστημονικούς κλάδους παρουσιάζουν μέσα σε λίγα μόλις λεπτά και με απλό λόγο τις πτυχιακές, διπλωματικές, διδακτορικές τους εργασίες ή τα επιστημονικά τους άρθρα με θεματικές που άπτονται των γνωσιακών επιστημών. Οι παρουσιάσεις γίνονται σε ζωντανή αναμετάδοση στα social media του Cognihub δίνοντας τη δυνατότητα στο κοινό να συμμετέχει ενεργά στη διαδικασία μέσω του chat.',
                example: 'https://firebasestorage.googleapis.com/v0/b/cognihub-8093e.appspot.com/o/events_banners%2F9e7e608d-adef-4c04-a87a-40ec6a852a73?alt=media&token=120b1090-b85e-411f-b6a5-b83a71562d67',
                anchorId: 'pt',
                href: '/events?categories=Παρουσιάσεις φοιτητών και νέων ερευνητών',
                imgSource: '/presentations.png'
            }
        ],
        anchorId: 'education'
    },
    {
        categoryTitle: 'Αγορά Εργασίας',
        categoryDescription: 'Είμαι επιχείρηση η οποία δραστηριοποιείται ή απασχολεί εργαζόμενους σε αντικείμενα που σχετίζονται με τη Γνωσιακή Επιστήμη',
        eventTypes: [
            {
                title: 'After Graduation Discussion',
                description: 'Ποια είναι η εμπειρία των αποφοίτων από τα πρώτα τους βήματα στον εργασιακό χώρο; Ακολούθησαν συμβατικές επιλογές ή μια πιο διεπιστημονική πορεία στις μεταπτυχιακές τους σπουδές; Ποιες προκαταλήψεις αντιμετωπίζουν είτε μετά το πρώτο πτυχίο είτε στην ακαδημαϊκή/επαγγελματική τους πορεία; Τι συμβουλές θα έδιναν στον παρελθοντικό τους εαυτό και στους φοιτητές μέσα από τη διαδρομή τους; Μέσω ζωντανής μετάδοσης στη σελίδα μας στο Facebook, απόφοιτοι από διάφορους κλάδους της Γνωσιακής Επιστήμης απαντούν σ’ αυτές και άλλες πολλές ερωτήσεις και μοιράζονται τις εμπειρίες τους στη δράση «After Graduation Discussion», προσπαθώντας να μας διαφωτίσουν για την ακαδημαϊκή και επαγγελματική πορεία μετά το μεταιχμιακό στάδιο της αποφοίτησης.',
                example: 'https://firebasestorage.googleapis.com/v0/b/cognihub-8093e.appspot.com/o/events_banners%2F3f251217-f3a3-4e79-b2ec-ff5c340fd6d9?alt=media&token=31b6c6a2-cd8a-4732-a619-260efef11282',
                anchorId: 'ag',
                href: '/events?categories=After Graduation Discussion',
                imgSource: '/aftergrad.png'
            },
            {
                title: 'Mentorhub',
                description: 'Είσαι φοιτητής ή νέος απόφοιτος; Σε ενδιαφέρει μια διεπιστημονική καριέρα και δεν ξέρεις πώς να ξεκινήσεις; Θα μπορούσες να αξιοποιήσεις τις συμβουλές νέων ατόμων με ουσιαστική επαγγελματική εμπειρία. Το MentorHub σε φέρνει σε επαφή με νέα άτομα που εργάζονται στους τομείς της πληροφορικής, της ψυχολογίας, της γλωσσολογίας, της βιολογίας και της φιλοσοφίας, εστιάζοντας στη διεπιστημονικότητα και τις εναλλακτικές επαγγελματικές διεξόδους.',
                example: 'https://firebasestorage.googleapis.com/v0/b/cognihub-8093e.appspot.com/o/events_banners%2F3f251217-f3a3-4e79-b2ec-ff5c340fd6d9?alt=media&token=31b6c6a2-cd8a-4732-a619-260efef11282',
                anchorId: 'mh',
                href: '/mentorhub',
                imgSource: '/mentorhub.png'
            }
        ],
        anchorId: 'workforce'
    }
]

function EventsGuide() {
    return (
        <div className={styles.EventsGuidePageContainer}>
            <h2>📃 Οδηγός Δράσεων</h2>
            <p>Οι δράσεις του Cognihub αφορούν τους παρακάτω άξονες</p>
            {EVENT_CATEGORIES.map((eventCategory) => (
                <EventCategoryCard
                    categoryTitle={eventCategory.categoryTitle}
                    categoryDescription={eventCategory.categoryDescription}
                    eventTypes={eventCategory.eventTypes}
                    anchorId={eventCategory.anchorId}
                />
            ))}
        </div>
    );
}

export default EventsGuide;
