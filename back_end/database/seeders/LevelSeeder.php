<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Lesson;
use App\Models\Level;
use App\Models\Quizlesson;
use App\Models\Quizunit;
use App\Models\Unit;
use App\Models\Vocabulary;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {



        $courses = Course::all();
        $levels = Level::all();

        foreach ($courses as $course) {
            foreach ($levels as $level) {
                if ($level->course_id !== $course->id) {
                    continue;
                }

                $units = [];
                $units = [];
                if ($course->id == 1) {
                    $units = [
                        'Débutant' => [
                            ['Les sons de base', 'الأصوات الأساسية', "Introduction aux sons fondamentaux du français.", "مقدمة للأصوات الأساسية في الفرنسية.", 1],
                            ['Prononciation des voyelles', 'نطق الحروف المتحركة', "Apprentissage des sons vocaliques.", "تعلم نطق الحروف المتحركة.", 2],
                            ['Consonnes difficiles', 'الحروف الساكنة الصعبة', "Exercice sur les sons complexes.", "تمارين على الأصوات المعقدة.", 3]
                        ],
                        'Intermédiaire' => [
                            ['Les voyelles nasales', 'حروف العلة الأنفية', "Apprentissage des sons nasaux.", "تعلم النطق بالحروف الأنفية.", 1],
                            ['Syllabes et intonation', 'المقاطع والتنغيم', "Travail sur le rythme des mots.", "العمل على إيقاع الكلمات.", 2],
                            ['Phonétique appliquée', 'الصوتيات التطبيقية', "Exercices de prononciation avancés.", "تمارين متقدمة على النطق.", 3]
                        ],
                        'Avancé' => [
                            ['Accent et rythme', 'اللهجة والإيقاع', "Travail sur le rythme et l'accentuation.", "العمل على الإيقاع والنبرة.", 1],
                            ['Différences régionales', 'الاختلافات الإقليمية', "Explorer les accents français.", "استكشاف اللهجات الفرنسية المختلفة.", 2],
                            ['Diction et fluidité', 'الإلقاء والطلاقة', "Améliorer la clarté et la fluidité.", "تحسين الوضوح والطلاقة في النطق.", 3]
                        ]
                    ];
                } elseif ($course->id == 2) {
                    $units = [
                        'Débutant' => [
                            ['Les articles', 'أدوات التعريف والتنكير', "Utilisation des articles définis et indéfinis.", "استخدام أدوات التعريف والنكرة.", 1],
                            ['Les adjectifs', 'الصفات', "Accorder et utiliser correctement les adjectifs.", "التوافق الصحيح واستخدام الصفات.", 2],
                            ['Les pronoms', 'الضمائر', "Introduction aux pronoms personnels et relatifs.", "مقدمة للضمائر الشخصية والموصولة.", 3]
                        ],
                        'Intermédiaire' => [
                            ['Les temps', 'الأزمنة', "Maîtriser les temps verbaux français.", "إتقان الأزمنة الفعلية في الفرنسية.", 1],
                            ['Les verbes irréguliers', 'الأفعال الشاذة', "Étude des verbes irréguliers et leur usage.", "دراسة الأفعال الشاذة واستخدامها.", 2],
                            ['Les prépositions', 'حروف الجر', "Utilisation correcte des prépositions en contexte.", "الاستخدام الصحيح لحروف الجر في السياقات المختلفة.", 3]
                        ],
                        'Avancé' => [
                            ['Les phrases complexes', 'الجمل المعقدة', "Construire des phrases bien structurées.", "بناء جمل مركبة ومترابطة.", 1],
                            ['Les modes et voix', 'الصيغ والمبني للمجهول', "Approfondissement des voix actives et passives.", "التعمق في المبني للمعلوم والمجهول.", 2],
                            ['Subjonctif et conditionnel', 'التصريف الشرطي والمضارع', "Usage avancé des modes verbaux.", "الاستخدام المتقدم للصيغ الفعلية.", 3]
                        ]
                    ];
                } elseif ($course->id == 3) {
                    $units = [
                        'Débutant' => [
                            ['Salutations et présentations', 'التحيات والتعريف بالنفس', "Apprendre à se présenter et à saluer.", "تعلم كيفية تقديم النفس وإلقاء التحية.", 1],
                            ['Poser des questions', 'طرح الأسئلة', "Techniques de base pour poser des questions.", "تقنيات أساسية لطرح الأسئلة في المحادثة.", 2],
                            ['Exprimer ses goûts', 'التعبير عن التفضيلات', "Parler de ses préférences et opinions.", "التحدث عن التفضيلات والآراء الشخصية.", 3],
                        ],
                        'Intermédiaire' => [
                            ['Discussions sur des sujets courants', 'مناقشة المواضيع العامة', "Améliorer la fluidité en parlant de sujets variés.", "تحسين الطلاقة من خلال التحدث عن مواضيع مختلفة.", 1],
                            ['Exprimer des émotions', 'التعبير عن المشاعر', "Utilisation du vocabulaire émotionnel.", "استخدام المفردات الخاصة بالمشاعر.", 2],
                            ['Débats et argumentation', 'المناقشات والحجج', "Apprendre à argumenter dans une conversation.", "تعلم كيفية المناقشة وبناء الحجج.", 3],
                        ],
                        'Avancé' => [
                            ['Discussions professionnelles', 'المحادثات المهنية', "Techniques de communication en entreprise.", "تقنيات التواصل في بيئة العمل.", 1],
                            ['Négociation et persuasion', 'التفاوض والإقناع', "Stratégies pour convaincre et négocier.", "استراتيجيات الإقناع والتفاوض.", 2],
                            ['Présentations orales', 'العروض الشفوية', "Parler en public avec confiance.", "التحدث أمام الجمهور بثقة.", 3],
                        ]
                    ];
                } elseif ($course->id == 5) {
                    $units = [
                        'Débutant' => [
                            ['Écoute de mots simples', 'الاستماع إلى الكلمات البسيطة', "Exercices d'écoute de vocabulaire de base.", "تمارين استماع للمفردات الأساسية.", 1],
                            ['Compréhension des dialogues', 'فهم الحوارات', "Écoute et compréhension de conversations courtes.", "الاستماع إلى الحوارات القصيرة وفهمها.", 2],
                            ['Distinction des sons', 'تمييز الأصوات', "Reconnaissance des sons du français.", "تمييز الأصوات المختلفة في الفرنسية.", 3],
                            ['Exercices de dictée', 'تمارين الإملاء', "Pratique d'écoute et d'écriture simultanées.", "تمارين استماع وكتابة في نفس الوقت.", 4]
                        ],
                        'Intermédiaire' => [['Compréhension avancée', 'الفهم المتقدم', "Analyse de conversations plus complexes.", "تحليل محادثات أكثر تعقيدًا.", 1]],
                        'Avancé' => [['Situations quotidiennes', 'المواقف اليومية', "Écoute de dialogues dans un contexte réel.", "الاستماع إلى محادثات في سياقات يومية.", 2]]
                    ];
                } elseif ($course->id == 4) {
                    $units = [
                        'Débutant' => [
                            ['Lecture de phrases simples', 'قراءة الجمل البسيطة', "Apprentissage de la lecture de phrases de base.", "تعلم قراءة الجمل الأساسية.", 1],
                            ['Compréhension de textes courts', 'فهم النصوص القصيرة', "Exercices sur la compréhension de courts paragraphes.", "تمارين على فهم الفقرات القصيرة.", 2],
                            ['Vocabulaire essentiel', 'المفردات الأساسية', "Apprentissage du vocabulaire courant.", "تعلم المفردات الشائعة.", 3]
                        ],
                        'Intermédiaire' => [
                            ['Lecture d’articles', 'قراءة المقالات', "Analyser et comprendre des articles variés.", "تحليل وفهم المقالات المتنوعة.", 1],
                            ['Interprétation de textes littéraires', 'تفسير النصوص الأدبية', "Introduction aux textes littéraires français.", "مقدمة في النصوص الأدبية الفرنسية.", 2],
                            ['Analyse des idées principales', 'تحليل الأفكار الرئيسية', "Techniques pour identifier les idées clés.", "تقنيات لتحديد الأفكار الرئيسية.", 3]
                        ],
                        'Avancé' => [['Lecture critique', 'القراءة النقدية', "Comprendre et interpréter des textes complexes.", "فهم وتحليل النصوص المعقدة.", 1]]
                    ];
                }

                foreach ($units[$level->title]  as $unit) {
                    $unitModel = Unit::create([
                        'level_id' => $level->id,
                        'number' => $unit[4],
                        'title' => $unit[0],
                        'title_ar' => $unit[1],
                        'description' => $unit[2],
                        'description_ar' => $unit[3]
                    ]);
                    $quizUnitQuestions = [
                        [
                            "Quel est le son de la lettre 'A' en français ?",
                            "ما هو صوت الحرف 'A' في الفرنسية ؟",
                            "Ah",
                            "Ouh",
                            "Eh",
                            "Uh",
                            "Ah"
                        ],
                        [
                            "Quelle est la différence entre 'é' et 'è' ?",
                            "ما الفرق بين 'é' و 'è' ؟",
                            "Aucune différence",
                            "Le son 'é' est plus fermé",
                            "Le son 'è' est plus ouvert",
                            "Les deux sons sont identiques",
                            "Le son 'è' est plus ouvert"
                        ],
                        [
                            "Quel son fait la combinaison 'ou' en français ?",
                            "ما الصوت الذي تنتجه الحروف 'ou' بالفرنسية ؟",
                            "O",
                            "Ou",
                            "E",
                            "U",
                            "Ou"
                        ],
                        [
                            "Comment se prononce 'gn' en français ?",
                            "كيف يتم نطق 'gn' بالفرنسية ؟",
                            "Comme 'n'",
                            "Comme 'g'",
                            "Comme 'ñ' en espagnol",
                            "Comme 'ng'",
                            "Comme 'ñ' en espagnol"
                        ],
                        [
                            "Quel son fait 'ch' en français ?",
                            "ما الصوت الذي تنتجه 'ch' في الفرنسية ؟",
                            "Sh",
                            "K",
                            "Tch",
                            "G",
                            "Sh"
                        ],
                        [
                            "Quel est le son de la lettre 'A' en français ?",
                            "ما هو صوت الحرف 'A' في الفرنسية ؟",
                            "Ah",
                            "Ouh",
                            "Eh",
                            "Uh",
                            "Ah"
                        ],
                        [
                            "Quelle est la différence entre 'é' et 'è' ?",
                            "ما الفرق بين 'é' و 'è' ؟",
                            "Aucune différence",
                            "Le son 'é' est plus fermé",
                            "Le son 'è' est plus ouvert",
                            "Les deux sons sont identiques",
                            "Le son 'è' est plus ouvert"
                        ],
                        [
                            "Quel son fait la combinaison 'ou' en français ?",
                            "ما الصوت الذي تنتجه الحروف 'ou' بالفرنسية ؟",
                            "O",
                            "Ou",
                            "E",
                            "U",
                            "Ou"
                        ],
                        [
                            "Comment se prononce 'gn' en français ?",
                            "كيف يتم نطق 'gn' بالفرنسية ؟",
                            "Comme 'n'",
                            "Comme 'g'",
                            "Comme 'ñ' en espagnol",
                            "Comme 'ng'",
                            "Comme 'ñ' en espagnol"
                        ],
                        [
                            "Quel son fait 'ch' en français ?",
                            "ما الصوت الذي تنتجه 'ch' في الفرنسية ؟",
                            "Sh",
                            "K",
                            "Tch",
                            "G",
                            "Sh"
                        ]
                    ];

                    foreach ($quizUnitQuestions as $q) {
                        Quizunit::create([
                            'unit_id' => $unitModel->id,
                            'question' => $q[0],
                            'answer_1' => $q[2],
                            'answer_2' => $q[3],
                            'answer_3' => $q[4],
                            'answer_4' => $q[5],
                            'answer_right' => $q[6]
                        ]);
                    }
                    for ($i = 1; $i <= 4; $i++) {
                        $lesson = Lesson::create([
                            'unit_id' => $unitModel->id,
                            'title' => "Leçon $i de " . $unit[0],
                            'title_ar' => "الدرس $i من " . $unit[1],
                            'content' => "Contenu de la leçon $i pour " . $unit[0],
                            'content_ar' => "محتوى الدرس $i لـ " . $unit[1],
                            'objective' => "À la fin de la leçon, vous devriez avoir appris les voyelles et la différence entre elles et les consonnes.",
                            'objective_ar' => 'بنهاية الذي يجب ان تكون قد تعلمت على الاحرف الصوتية وفرق بينها وبين الاحرف الساكنة',
                            'video_url' => "https://youtube.com/watch?v=qRGnhd5aFVQ&si=z3YZZR8nXw17saHs",
                        ]);

                        $quizLessonQuestions = [
                            [
                                "Quelle est la voyelle qui se prononce comme 'ee' en anglais ?",
                                "ما هو الحرف الصوتي الذي يُنطق مثل 'ee' في الإنجليزية ؟",
                                "A",
                                "E",
                                "I",
                                "U",
                                "I"
                            ],
                            [
                                "Quelle lettre est souvent muette en fin de mot en français ?",
                                "أي حرف غالبًا ما يكون صامتًا في نهاية الكلمة الفرنسية ؟",
                                "E",
                                "T",
                                "M",
                                "D",
                                "E"
                            ],
                            [
                                "Comment prononce-t-on 'ç' en français ?",
                                "كيف يتم نطق 'ç' في الفرنسية ؟",
                                "Comme 's'",
                                "Comme 'k'",
                                "Comme 'ch'",
                                "Comme 'g'",
                                "Comme 's'"
                            ],
                            [
                                "Quel est l'exemple correct d'un mot avec une voyelle nasale ?",
                                "ما هو المثال الصحيح لكلمة تحتوي على حرف علة أنفي ؟",
                                "Bon",
                                "Chat",
                                "Merci",
                                "Petit",
                                "Bon"
                            ],
                            [
                                "Quelle lettre change de prononciation devant 'e', 'i' et 'y' ?",
                                "أي حرف يتغير نطقه أمام 'e', 'i' و 'y' ؟",
                                "C",
                                "G",
                                "H",
                                "J",
                                "G"
                            ],
                            [
                                "Quelle est la voyelle qui se prononce comme 'ee' en anglais ?",
                                "ما هو الحرف الصوتي الذي يُنطق مثل 'ee' في الإنجليزية ؟",
                                "A",
                                "E",
                                "I",
                                "U",
                                "I"
                            ],
                            [
                                "Quelle lettre est souvent muette en fin de mot en français ?",
                                "أي حرف غالبًا ما يكون صامتًا في نهاية الكلمة الفرنسية ؟",
                                "E",
                                "T",
                                "M",
                                "D",
                                "E"
                            ],
                            [
                                "Comment prononce-t-on 'ç' en français ?",
                                "كيف يتم نطق 'ç' في الفرنسية ؟",
                                "Comme 's'",
                                "Comme 'k'",
                                "Comme 'ch'",
                                "Comme 'g'",
                                "Comme 's'"
                            ],
                            [
                                "Quel est l'exemple correct d'un mot avec une voyelle nasale ?",
                                "ما هو المثال الصحيح لكلمة تحتوي على حرف علة أنفي ؟",
                                "Bon",
                                "Chat",
                                "Merci",
                                "Petit",
                                "Bon"
                            ],
                            [
                                "Quelle lettre change de prononciation devant 'e', 'i' et 'y' ?",
                                "أي حرف يتغير نطقه أمام 'e', 'i' و 'y' ؟",
                                "C",
                                "G",
                                "H",
                                "J",
                                "G"
                            ]
                        ];

                        foreach ($quizLessonQuestions as $q) {
                            Quizlesson::create([
                                'lesson_id' => $lesson->id,
                                'question' => $q[0],
                                'answer_1' => $q[2],
                                'answer_2' => $q[3],
                                'answer_3' => $q[4],
                                'answer_4' => $q[5],
                                'answer_right' => $q[6]
                            ]);
                        }

                        // إضافة المفردات لكل درس
                        for ($j = 1; $j <= 5; $j++) {
                            Vocabulary::create([
                                'lesson_id' => $lesson->id,
                                'word' => "Leçon",
                                'translation' => "درس",
                                'example_sentence' => "Exemple de phrase pour Mot$j de " . $unit[0],
                                'audio_url' => null
                            ]);
                        }
                    }
                }
            }
        }
    }
}
