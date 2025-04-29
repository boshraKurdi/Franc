<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Level;
use App\Models\Quizcourse;
use App\Models\Topic;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $courses = [
            [
                'title' => 'Phonétique française',
                'title_ar' => 'الصوتيات',
                "description" => "Dans le cours de phonétique, vous apprendrez à prononcer correctement les mots français. Nous nous concentrerons sur différents sons, intonations et rythmes, vous permettant d'améliorer votre prononciation et d'accroître votre confiance lorsque vous parlez.",
                'description_ar' => "في دورة الصوتيات، ستتعلم كيفية نطق الكلمات الفرنسية بشكل صحيح. سنركز على الأصوات المختلفة، التنغيم، والإيقاع، مما يمكنك من تحسين نطقك وزيادة ثقتك أثناء التحدث",
                'topics' => [
                    ['title' => 'Les voyelles et consonnes', 'title_ar' => 'حروف العلة والحروف الساكنة', 'description' => "Apprenez à distinguer et prononcer correctement les voyelles et les consonnes.", 'description_ar' => "تعلم كيفية التمييز بين حروف العلة والحروف الساكنة ونطقها بشكل صحيح."],
                    ['title' => 'Liaisons et élisions', 'title_ar' => 'الربط والحذف', 'description' => "Découvrez les règles de liaison et d'élision pour une prononciation fluide.", 'description_ar' => "اكتشف قواعد الربط والحذف لتحقيق نطق سلس."],
                    ['title' => 'Les accents en français', 'title_ar' => 'اللهجات في الفرنسية', 'description' => "Comprenez l'importance des accents et leur impact sur la prononciation.", 'description_ar' => "افهم أهمية اللهجات وتأثيرها على النطق."],
                    ['title' => 'L’intonation et le rythme', 'title_ar' => 'التنغيم والإيقاع', 'description' => "Apprenez à bien moduler votre voix pour parler naturellement.", 'description_ar' => "تعلم كيفية تعديل صوتك للتحدث بشكل طبيعي."],
                    ['title' => 'Les sons difficiles', 'title_ar' => 'الأصوات الصعبة', 'description' => "Pratiquez la prononciation des sons français les plus compliqués.", 'description_ar' => "تمرن على نطق الأصوات الفرنسية الصعبة."]
                ],
                'levels' => [
                    ['number' => 1, 'title' => 'Débutant', 'title_ar' => 'مبتدئ', 'description' => "Introduction aux sons de base et à la prononciation française.", 'description_ar' => "مقدمة في الأصوات الأساسية والنطق في الفرنسية."],
                    ['number' => 2, 'title' => 'Intermédiaire', 'title_ar' => 'متوسط', 'description' => "Perfectionnement de la prononciation et des liaisons.", 'description_ar' => "تحسين النطق وقواعد الربط."],
                    ['number' => 3, 'title' => 'Avancé', 'title_ar' => 'متقدم', 'description' => "Maîtrise des nuances phonétiques et des accents régionaux.", 'description_ar' => "إتقان الفروق الصوتية واللهجات الإقليمية."]
                ],
                'questions' => [
                    ['question' => "Quelle est la bonne prononciation de 'bonjour' ?", 'answer_1' => "bon-jour", 'answer_2' => "bo-jour", 'answer_3' => "ban-jour", 'answer_4' => "boun-jour", 'answer_right' => "bon-jour", 'type' => 'level'],
                    ['question' => "Comment prononce-t-on correctement 'merci' ?", 'answer_1' => "mer-ssi", 'answer_2' => "mersi", 'answer_3' => "mair-ci", 'answer_4' => "merchi", 'answer_right' => "mersi", 'type' => 'level'],
                    ['question' => "Quel son est nasal parmi les suivants ?", 'answer_1' => "on", 'answer_2' => "an", 'answer_3' => "in", 'answer_4' => "Toutes les réponses", 'answer_right' => "Toutes les réponses", 'type' => 'level'],
                    ['question' => "Quel mot contient le son [ʒ] ?", 'answer_1' => "Jardin", 'answer_2' => "Chien", 'answer_3' => "Table", 'answer_4' => "Roue", 'answer_right' => "Jardin", 'type' => 'level'],
                    ['question' => "Quel est le son correct pour 'fille' ?", 'answer_1' => "fill", 'answer_2' => "fiy", 'answer_3' => "fee-ye", 'answer_4' => "fille", 'answer_right' => "fee-ye", 'type' => 'level'],
                    ['question' => "Quel est l'article défini de 'école' ?", 'answer_1' => "Le", 'answer_2' => "La", 'answer_3' => "Un", 'answer_4' => "Des", 'answer_right' => "La", 'type' => 'level'],
                    ['question' => "Quelle est la forme correcte du passé composé ?", 'answer_1' => "J'ai allé", 'answer_2' => "Je suis allé", 'answer_3' => "Je va allé", 'answer_4' => "Je vais allais", 'answer_right' => "Je suis allé", 'type' => 'level'],
                    ['question' => "Quelle phrase est correcte ?", 'answer_1' => "Il faut que je fais", 'answer_2' => "Il faut que je fasse", 'answer_3' => "Il faut que je fait", 'answer_4' => "Il faut que je faisais", 'answer_right' => "Il faut que je fasse", 'type' => 'level'],
                    ['question' => "Quel est le pluriel de 'cheval' ?", 'answer_1' => "Chevals", 'answer_2' => "Chevaux", 'answer_3' => "Chevale", 'answer_4' => "Chevales", 'answer_right' => "Chevaux", 'type' => 'level'],
                    ['question' => "Quel est le féminin de 'acteur' ?", 'answer_1' => "Acteuse", 'answer_2' => "Actrice", 'answer_3' => "Acteur", 'answer_4' => "Acteure", 'answer_right' => "Actrice", 'type' => 'level']
                ]
            ],
            [
                'title' => 'Grammaire française',
                'title_ar' => 'قواعد اللغة الفرنسية',
                'description' => 'Découvrez les bases de la langue française avec un cours de grammaire complet. Vous apprendrez à construire des phrases, à utiliser les temps et à comprendre correctement la structure grammaticale. Ce cours est idéal pour les débutants et ceux qui souhaitent améliorer leurs compétences en grammaire.',
                'description_ar' => 'اكتشف أساسيات اللغة الفرنسية من خلال دورة شاملة في القواعد. ستتعلم كيفية بناء الجمل، استخدام الأزمنة، وفهم التركيب النحوي بشكل صحيح. هذه الدورة مثالية للمبتدئين ولمن يرغب في تعزيز مهاراته النحوية',
                'topics' => [
                    ['title' => 'Les temps verbaux', 'title_ar' => 'الأزمنة في الأفعال', 'description' => "Maîtrisez l'utilisation des différents temps en français.", 'description_ar' => "إتقان استخدام الأزمنة المختلفة في الفرنسية."],
                    ['title' => 'Les pronoms', 'title_ar' => 'الضمائر', 'description' => "Apprenez à utiliser correctement les pronoms personnels et relatifs.", 'description_ar' => "تعلم كيفية استخدام الضمائر الشخصية والموصولة بشكل صحيح."],
                    ['title' => 'Les adjectifs et adverbes', 'title_ar' => 'الصفات والظروف', 'description' => "Découvrez comment employer correctement les adjectifs et les adverbes.", 'description_ar' => "تعلم كيفية استخدام الصفات والظروف بشكل صحيح."],
                    ['title' => 'La conjugaison des verbes', 'title_ar' => 'تصريف الأفعال', 'description' => "Apprenez les règles de conjugaison des verbes réguliers et irréguliers.", 'description_ar' => "تعلم قواعد تصريف الأفعال المنتظمة والشاذة."],
                    ['title' => 'Les prépositions', 'title_ar' => 'حروف الجر', 'description' => "Comprenez l'utilisation correcte des prépositions en français.", 'description_ar' => "افهم الاستخدام الصحيح لحروف الجر في الفرنسية."]
                ],
                'levels' => [
                    ['number' => 1, 'title' => 'Débutant', 'title_ar' => 'مبتدئ', 'description' => "Les bases de la grammaire française pour commencer à écrire et parler.", 'description_ar' => "أساسيات قواعد اللغة الفرنسية لبدء الكتابة والتحدث."],
                    ['number' => 2, 'title' => 'Intermédiaire', 'title_ar' => 'متوسط', 'description' => "Analyse des structures grammaticales plus complexes.", 'description_ar' => "تحليل التراكيب النحوية الأكثر تعقيدًا."],
                    ['number' => 3, 'title' => 'Avancé', 'title_ar' => 'متقدم', 'description' => "Maîtrise de la grammaire avancée et des subtilités linguistiques.", 'description_ar' => "إتقان القواعد المتقدمة والفروق اللغوية الدقيقة."]
                ],
                'questions' => [
                    ['question' => "Quel est l'article défini de 'école' ?", 'answer_1' => "Le", 'answer_2' => "La", 'answer_3' => "Un", 'answer_4' => "Des", 'answer_right' => "La", 'type' => 'level'],
                    ['question' => "Quelle est la forme correcte du passé composé ?", 'answer_1' => "J'ai allé", 'answer_2' => "Je suis allé", 'answer_3' => "Je va allé", 'answer_4' => "Je vais allais", 'answer_right' => "Je suis allé", 'type' => 'level'],
                    ['question' => "Quelle phrase est correcte ?", 'answer_1' => "Il faut que je fais", 'answer_2' => "Il faut que je fasse", 'answer_3' => "Il faut que je fait", 'answer_4' => "Il faut que je faisais", 'answer_right' => "Il faut que je fasse", 'type' => 'level'],
                    ['question' => "Quel est le pluriel de 'cheval' ?", 'answer_1' => "Chevals", 'answer_2' => "Chevaux", 'answer_3' => "Chevale", 'answer_4' => "Chevales", 'answer_right' => "Chevaux", 'type' => 'level'],
                    ['question' => "Quel est le féminin de 'acteur' ?", 'answer_1' => "Acteuse", 'answer_2' => "Actrice", 'answer_3' => "Acteur", 'answer_4' => "Acteure", 'answer_right' => "Actrice", 'type' => 'level'],
                    ['question' => "Quel est l'article défini de 'école' ?", 'answer_1' => "Le", 'answer_2' => "La", 'answer_3' => "Un", 'answer_4' => "Des", 'answer_right' => "La", 'type' => 'level'],
                    ['question' => "Quelle est la forme correcte du passé composé ?", 'answer_1' => "J'ai allé", 'answer_2' => "Je suis allé", 'answer_3' => "Je va allé", 'answer_4' => "Je vais allais", 'answer_right' => "Je suis allé", 'type' => 'level'],
                    ['question' => "Quelle phrase est correcte ?", 'answer_1' => "Il faut que je fais", 'answer_2' => "Il faut que je fasse", 'answer_3' => "Il faut que je fait", 'answer_4' => "Il faut que je faisais", 'answer_right' => "Il faut que je fasse", 'type' => 'level'],
                    ['question' => "Quel est le pluriel de 'cheval' ?", 'answer_1' => "Chevals", 'answer_2' => "Chevaux", 'answer_3' => "Chevale", 'answer_4' => "Chevales", 'answer_right' => "Chevaux", 'type' => 'level'],
                    ['question' => "Quel est le féminin de 'acteur' ?", 'answer_1' => "Acteuse", 'answer_2' => "Actrice", 'answer_3' => "Acteur", 'answer_4' => "Acteure", 'answer_right' => "Actrice", 'type' => 'level']
                ]
            ],
            [
                'title' => 'Conversation en français',
                'title_ar' => 'المحادثة',
                "description" => "Le cours de conversation vise à améliorer vos compétences en français oral. Grâce à des exercices conversationnels et interactifs, vous pourrez pratiquer la langue dans des situations du quotidien et développer votre capacité à vous exprimer couramment.",
                'description_ar' => " تهدف دورة المحادثة إلى تعزيز مهاراتك في التحدث باللغة الفرنسية. من خلال تمارين حوارية وتفاعلية، ستتمكن من ممارسة اللغة في مواقف يومية وتطوير قدرتك على التعبير عن نفسك بطلاقة",
                'topics' => [
                    ['title' => 'Se présenter', 'title_ar' => 'التعريف بالنفس', 'description' => "Apprenez à vous présenter et à parler de vous-même en français.", 'description_ar' => "تعلم كيفية تقديم نفسك والتحدث عن نفسك باللغة الفرنسية."],
                    ['title' => 'Poser des questions', 'title_ar' => 'طرح الأسئلة', 'description' => "Maîtrisez l'art de poser des questions dans différentes situations.", 'description_ar' => "إتقان فن طرح الأسئلة في مختلف المواقف."],
                    ['title' => 'Exprimer ses opinions', 'title_ar' => 'التعبير عن الرأي', 'description' => "Apprenez à donner et défendre votre opinion en français.", 'description_ar' => "تعلم كيفية التعبير عن رأيك والدفاع عنه باللغة الفرنسية."],
                    ['title' => 'Les conversations courantes', 'title_ar' => 'المحادثات اليومية', 'description' => "Pratiquez des dialogues sur des sujets quotidiens.", 'description_ar' => "تمرن على المحادثات حول المواضيع اليومية."],
                    ['title' => 'Les expressions idiomatiques', 'title_ar' => 'التعبيرات الاصطلاحية', 'description' => "Découvrez des expressions courantes pour parler naturellement.", 'description_ar' => "اكتشف التعبيرات الشائعة للتحدث بشكل طبيعي."]
                ],
                'levels' => [
                    ['number' => 1, 'title' => 'Débutant', 'title_ar' => 'مبتدئ', 'description' => "Apprendre à se présenter et parler de sujets simples.", 'description_ar' => "تعلم تقديم نفسك والتحدث عن مواضيع بسيطة."],
                    ['number' => 2, 'title' => 'Intermédiaire', 'title_ar' => 'متوسط', 'description' => "Développement des compétences pour des conversations fluides.", 'description_ar' => "تطوير المهارات لمحادثات أكثر سلاسة."],
                    ['number' => 3, 'title' => 'Avancé', 'title_ar' => 'متقدم', 'description' => "Maîtrise des débats et discussions complexes.", 'description_ar' => "إتقان النقاشات والمحادثات المعقدة."]
                ],
                'questions' => [
                    ['question' => "Quel est l'article défini de 'école' ?", 'answer_1' => "Le", 'answer_2' => "La", 'answer_3' => "Un", 'answer_4' => "Des", 'answer_right' => "La", 'type' => 'level'],
                    ['question' => "Quelle est la forme correcte du passé composé ?", 'answer_1' => "J'ai allé", 'answer_2' => "Je suis allé", 'answer_3' => "Je va allé", 'answer_4' => "Je vais allais", 'answer_right' => "Je suis allé", 'type' => 'level'],
                    ['question' => "Quelle phrase est correcte ?", 'answer_1' => "Il faut que je fais", 'answer_2' => "Il faut que je fasse", 'answer_3' => "Il faut que je fait", 'answer_4' => "Il faut que je faisais", 'answer_right' => "Il faut que je fasse", 'type' => 'level'],
                    ['question' => "Quel est le pluriel de 'cheval' ?", 'answer_1' => "Chevals", 'answer_2' => "Chevaux", 'answer_3' => "Chevale", 'answer_4' => "Chevales", 'answer_right' => "Chevaux", 'type' => 'level'],
                    ['question' => "Quel est le féminin de 'acteur' ?", 'answer_1' => "Acteuse", 'answer_2' => "Actrice", 'answer_3' => "Acteur", 'answer_4' => "Acteure", 'answer_right' => "Actrice", 'type' => 'level'],
                    ['question' => "Quel est l'article défini de 'école' ?", 'answer_1' => "Le", 'answer_2' => "La", 'answer_3' => "Un", 'answer_4' => "Des", 'answer_right' => "La", 'type' => 'level'],
                    ['question' => "Quelle est la forme correcte du passé composé ?", 'answer_1' => "J'ai allé", 'answer_2' => "Je suis allé", 'answer_3' => "Je va allé", 'answer_4' => "Je vais allais", 'answer_right' => "Je suis allé", 'type' => 'level'],
                    ['question' => "Quelle phrase est correcte ?", 'answer_1' => "Il faut que je fais", 'answer_2' => "Il faut que je fasse", 'answer_3' => "Il faut que je fait", 'answer_4' => "Il faut que je faisais", 'answer_right' => "Il faut que je fasse", 'type' => 'level'],
                    ['question' => "Quel est le pluriel de 'cheval' ?", 'answer_1' => "Chevals", 'answer_2' => "Chevaux", 'answer_3' => "Chevale", 'answer_4' => "Chevales", 'answer_right' => "Chevaux", 'type' => 'level'],
                    ['question' => "Quel est le féminin de 'acteur' ?", 'answer_1' => "Acteuse", 'answer_2' => "Actrice", 'answer_3' => "Acteur", 'answer_4' => "Acteure", 'answer_right' => "Actrice", 'type' => 'level']
                ]
            ],
            [
                'title' => 'Lecture en français',
                'title_ar' => 'القراءة',
                "description" => "Profitez de la lecture de textes littéraires et culturels dans le cadre du cours de lecture. Ce cours vous aidera à améliorer vos compétences en lecture et en compréhension, en mettant l'accent sur l'analyse de textes et l'exploration des significations plus profondes de la langue française.",
                'description_ar' => " استمتع بقراءة نصوص أدبية وثقافية في دورة القراءة. ستساعدك هذه الدورة على تحسين مهارات القراءة والفهم، مع التركيز على تحليل النصوص واستكشاف المعاني العميقة للغة الفرنسية",
                'topics' => [
                    ['title' => 'Comprendre un texte', 'title_ar' => 'فهم النصوص', 'description' => "Apprenez les techniques pour mieux comprendre un texte écrit.", 'description_ar' => "تعلم تقنيات لفهم النصوص المكتوبة بشكل أفضل."],
                    ['title' => 'Lire un article de presse', 'title_ar' => 'قراءة المقالات الصحفية', 'description' => "Développez vos compétences en lecture de journaux et magazines.", 'description_ar' => "طور مهاراتك في قراءة الصحف والمجلات."],
                    ['title' => 'Les genres littéraires', 'title_ar' => 'الأنواع الأدبية', 'description' => "Découvrez les différents styles d'écriture et genres littéraires.", 'description_ar' => "تعرف على أساليب الكتابة المختلفة والأنواع الأدبية."],
                    ['title' => 'Analyser un texte', 'title_ar' => 'تحليل النصوص', 'description' => "Apprenez à repérer les idées principales et secondaires d’un texte.", 'description_ar' => "تعلم كيفية تحديد الأفكار الرئيسية والثانوية في النصوص."],
                    ['title' => 'Lecture et prononciation', 'title_ar' => 'القراءة والنطق', 'description' => "Pratiquez la lecture à haute voix pour améliorer votre prononciation.", 'description_ar' => "تمرن على القراءة بصوت عالٍ لتحسين نطقك."]
                ],
                'levels' => [
                    ['number' => 1, 'title' => 'Débutant', 'title_ar' => 'مبتدئ', 'description' => "Lecture de textes courts et compréhension des mots de base.", 'description_ar' => "قراءة نصوص قصيرة وفهم الكلمات الأساسية."],
                    ['number' => 2, 'title' => 'Intermédiaire', 'title_ar' => 'متوسط', 'description' => "Analyse de textes plus longs et compréhension du contexte.", 'description_ar' => "تحليل نصوص أطول وفهم السياق."],
                    ['number' => 3, 'title' => 'Avancé', 'title_ar' => 'متقدم', 'description' => "Lecture et interprétation de textes littéraires complexes.", 'description_ar' => "قراءة وتفسير النصوص الأدبية المعقدة."]
                ],
                'questions' => [
                    ['question' => "Quel est l'article défini de 'école' ?", 'answer_1' => "Le", 'answer_2' => "La", 'answer_3' => "Un", 'answer_4' => "Des", 'answer_right' => "La", 'type' => 'level'],
                    ['question' => "Quelle est la forme correcte du passé composé ?", 'answer_1' => "J'ai allé", 'answer_2' => "Je suis allé", 'answer_3' => "Je va allé", 'answer_4' => "Je vais allais", 'answer_right' => "Je suis allé", 'type' => 'level'],
                    ['question' => "Quelle phrase est correcte ?", 'answer_1' => "Il faut que je fais", 'answer_2' => "Il faut que je fasse", 'answer_3' => "Il faut que je fait", 'answer_4' => "Il faut que je faisais", 'answer_right' => "Il faut que je fasse", 'type' => 'level'],
                    ['question' => "Quel est le pluriel de 'cheval' ?", 'answer_1' => "Chevals", 'answer_2' => "Chevaux", 'answer_3' => "Chevale", 'answer_4' => "Chevales", 'answer_right' => "Chevaux", 'type' => 'level'],
                    ['question' => "Quel est le féminin de 'acteur' ?", 'answer_1' => "Acteuse", 'answer_2' => "Actrice", 'answer_3' => "Acteur", 'answer_4' => "Acteure", 'answer_right' => "Actrice", 'type' => 'level'],
                    ['question' => "Quel est l'article défini de 'école' ?", 'answer_1' => "Le", 'answer_2' => "La", 'answer_3' => "Un", 'answer_4' => "Des", 'answer_right' => "La", 'type' => 'level'],
                    ['question' => "Quelle est la forme correcte du passé composé ?", 'answer_1' => "J'ai allé", 'answer_2' => "Je suis allé", 'answer_3' => "Je va allé", 'answer_4' => "Je vais allais", 'answer_right' => "Je suis allé", 'type' => 'level'],
                    ['question' => "Quelle phrase est correcte ?", 'answer_1' => "Il faut que je fais", 'answer_2' => "Il faut que je fasse", 'answer_3' => "Il faut que je fait", 'answer_4' => "Il faut que je faisais", 'answer_right' => "Il faut que je fasse", 'type' => 'level'],
                    ['question' => "Quel est le pluriel de 'cheval' ?", 'answer_1' => "Chevals", 'answer_2' => "Chevaux", 'answer_3' => "Chevale", 'answer_4' => "Chevales", 'answer_right' => "Chevaux", 'type' => 'level'],
                    ['question' => "Quel est le féminin de 'acteur' ?", 'answer_1' => "Acteuse", 'answer_2' => "Actrice", 'answer_3' => "Acteur", 'answer_4' => "Acteure", 'answer_right' => "Actrice", 'type' => 'level']
                ]
            ],
            [
                'title' => 'Compréhension orale',
                'title_ar' => 'الاستماع',
                "description" => "Le cours d’écoute améliore vos compétences en compréhension orale grâce à une variété de supports audio. Vous écouterez des conversations, des histoires et des extraits de films, vous aidant à améliorer votre capacité à comprendre la langue dans différents contextes.",
                'description_ar' => "تعزز دورة الاستماع مهارات الفهم السمعي لديك من خلال مجموعة متنوعة من المواد السمعية. ستستمع إلى محادثات، قصص، ومقاطع من الأفلام، مما يساعدك على تحسين قدرتك على فهم اللغة في سياقاتها المختلفة",
                'topics' => [
                    ['title' => 'Comprendre les dialogues', 'title_ar' => 'فهم الحوارات', 'description' => "Apprenez à suivre et comprendre des conversations en français.", 'description_ar' => "تعلم كيفية متابعة وفهم المحادثات باللغة الفرنسية."],
                    ['title' => 'Écouter et répéter', 'title_ar' => 'الاستماع والتكرار', 'description' => "Pratiquez l'écoute active en répétant après un locuteur natif.", 'description_ar' => "تمرن على الاستماع الفعال من خلال التكرار بعد متحدث أصلي."],
                    ['title' => 'Les accents régionaux', 'title_ar' => 'اللهجات الإقليمية', 'description' => "Découvrez les variations d'accent et de prononciation.", 'description_ar' => "اكتشف الاختلافات في النطق واللهجات الإقليمية."],
                    ['title' => 'Comprendre les actualités', 'title_ar' => 'فهم الأخبار', 'description' => "Entraînez-vous à écouter des journaux et reportages français.", 'description_ar' => "تمرن على الاستماع إلى النشرات الإخبارية والتقارير الفرنسية."],
                    ['title' => 'Les expressions courantes', 'title_ar' => 'التعبيرات الشائعة', 'description' => "Apprenez les expressions idiomatiques françaises courantes.", 'description_ar' => "تعلم التعبيرات الاصطلاحية الشائعة في الفرنسية."]
                ],
                'levels' => [
                    ['number' => 1, 'title' => 'Débutant', 'title_ar' => 'مبتدئ', 'description' => "Écoute de phrases simples et exercices de reconnaissance des sons.", 'description_ar' => "الاستماع إلى جمل بسيطة وتمارين تمييز الأصوات."],
                    ['number' => 2, 'title' => 'Intermédiaire', 'title_ar' => 'متوسط', 'description' => "Compréhension de conversations courantes et dialogues.", 'description_ar' => "فهم المحادثات اليومية والحوارات."],
                    ['number' => 3, 'title' => 'Avancé', 'title_ar' => 'متقدم', 'description' => "Analyse des accents variés et des discours rapides.", 'description_ar' => "تحليل اللهجات المختلفة والخطابات السريعة."]
                ],
                'questions' => [
                    ['question' => "Quel est l'article défini de 'école' ?", 'answer_1' => "Le", 'answer_2' => "La", 'answer_3' => "Un", 'answer_4' => "Des", 'answer_right' => "La", 'type' => 'level'],
                    ['question' => "Quelle est la forme correcte du passé composé ?", 'answer_1' => "J'ai allé", 'answer_2' => "Je suis allé", 'answer_3' => "Je va allé", 'answer_4' => "Je vais allais", 'answer_right' => "Je suis allé", 'type' => 'level'],
                    ['question' => "Quelle phrase est correcte ?", 'answer_1' => "Il faut que je fais", 'answer_2' => "Il faut que je fasse", 'answer_3' => "Il faut que je fait", 'answer_4' => "Il faut que je faisais", 'answer_right' => "Il faut que je fasse", 'type' => 'level'],
                    ['question' => "Quel est le pluriel de 'cheval' ?", 'answer_1' => "Chevals", 'answer_2' => "Chevaux", 'answer_3' => "Chevale", 'answer_4' => "Chevales", 'answer_right' => "Chevaux", 'type' => 'level'],
                    ['question' => "Quel est le féminin de 'acteur' ?", 'answer_1' => "Acteuse", 'answer_2' => "Actrice", 'answer_3' => "Acteur", 'answer_4' => "Acteure", 'answer_right' => "Actrice", 'type' => 'level'],
                    ['question' => "Quel est l'article défini de 'école' ?", 'answer_1' => "Le", 'answer_2' => "La", 'answer_3' => "Un", 'answer_4' => "Des", 'answer_right' => "La", 'type' => 'level'],
                    ['question' => "Quelle est la forme correcte du passé composé ?", 'answer_1' => "J'ai allé", 'answer_2' => "Je suis allé", 'answer_3' => "Je va allé", 'answer_4' => "Je vais allais", 'answer_right' => "Je suis allé", 'type' => 'level'],
                    ['question' => "Quelle phrase est correcte ?", 'answer_1' => "Il faut que je fais", 'answer_2' => "Il faut que je fasse", 'answer_3' => "Il faut que je fait", 'answer_4' => "Il faut que je faisais", 'answer_right' => "Il faut que je fasse", 'type' => 'level'],
                    ['question' => "Quel est le pluriel de 'cheval' ?", 'answer_1' => "Chevals", 'answer_2' => "Chevaux", 'answer_3' => "Chevale", 'answer_4' => "Chevales", 'answer_right' => "Chevaux", 'type' => 'level'],
                    ['question' => "Quel est le féminin de 'acteur' ?", 'answer_1' => "Acteuse", 'answer_2' => "Actrice", 'answer_3' => "Acteur", 'answer_4' => "Acteure", 'answer_right' => "Actrice", 'type' => 'level']
                ]
            ]
        ];
        foreach ($courses as $courseData) {
            $topics = $courseData['topics'];
            unset($courseData['topics']);
            $levels = $courseData['levels'];
            unset($courseData['levels']);
            $questions = $courseData['questions'];
            unset($courseData['questions']);
            $course = Course::create($courseData);

            foreach ($topics as $topic) {
                Topic::create(array_merge($topic, ['course_id' => $course->id]));
            }
            foreach ($levels as $level) {
                Level::create(array_merge($level, ['course_id' => $course->id]));
            }
            foreach ($questions as $questionData) {
                Quizcourse::create(array_merge($questionData, ['course_id' => $course->id]));
            }
        }
    }
}
