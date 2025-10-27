(function() {
  const toolContainer = document.getElementById('amp-story-generator-tool');
  if (!toolContainer) return;

  const storyForm = toolContainer.querySelector('#storyForm');
  const generatedCodeEl = toolContainer.querySelector('#generatedCode');
  const outputEl = toolContainer.querySelector('#output');
  const pagesCountSelect = toolContainer.querySelector('#pagesCount');
  const howToUsePanel = toolContainer.querySelector('#howToUsePanel');
  const finalPagePanel = toolContainer.querySelector('#finalPagePanel');
  const extraButtonPanel = toolContainer.querySelector('#extraButtonPanel');
  const copyBtnInline = toolContainer.querySelector('#copyBtnInline');
  
  // حقول الألوان والحركة المتأثرة بخيار الصفحات
  const howToUseColorRows = toolContainer.querySelectorAll('.howToUseColorRow');
  const finalColorRows = toolContainer.querySelector('.finalColorRow');
  const howToUseAnimationRow = toolContainer.querySelector('.howToUseAnimationRow');
  const finalAnimationRow = toolContainer.querySelector('.finalAnimationRow');
  
  // حقول التحكم في الحجم المضافة
  const baseFontSizeInput = toolContainer.querySelector('#baseFontSize');
  const contentMaxWidthInput = toolContainer.querySelector('#contentMaxWidth');
  const fontFamilySelect = toolContainer.querySelector('#fontFamily');
  const socialShareImageInput = toolContainer.querySelector('#socialShareImage'); // NEW
  const colorPresetSelect = toolContainer.querySelector('#colorPreset'); // NEW

  // حقول التحكم في أحجام النصوص
  const coverH1SizeFactor = toolContainer.querySelector('#coverH1SizeFactor');
  const coverPSizeFactor = toolContainer.querySelector('#coverPSizeFactor');
  const featuresH2SizeFactor = toolContainer.querySelector('#featuresH2SizeFactor');
  const featuresPSizeFactor = toolContainer.querySelector('#featuresPSizeFactor');
  const howToH2SizeFactor = toolContainer.querySelector('#howToH2SizeFactor');
  const finalH1SizeFactor = toolContainer.querySelector('#finalH1SizeFactor');
  const finalPSizeFactor = toolContainer.querySelector('#finalPSizeFactor');
  const finalBtnSizeFactor = toolContainer.querySelector('#finalBtnSizeFactor');

  // حقل تفعيل الحدود
  const enableBordersSelect = toolContainer.querySelector('#enableBorders');
  
  // القيم الافتراضية
  const defaultValues = {
      publisher: 'مود ويب',
      toolLink: 'https://modweeb.com',
      logoSrc: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi3ldhymvuY5I7NZbNOd9pqddg-TKz93QJmdQeObuHjNwruANsaAEl5giHrDRQXrZDtm4b-cV5pH0fXwFjkr7nM4rMovDiFlOkuO2LOky4AKS_aM-OFMwJ1d0ALm2RrYrUyeiX5NsVWankv4i6kO-rlmuWUgl4stGCD15yT2VpR2xh2aHWl22pv8tvH0ok/s514/modweeb-story1.png',
      posterSrc: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi3ldhymvuY5I7NZbNOd9pqddg-TKz93QJmdQeObuHjNwruANsaAEl5giHrDRQXrZDtm4b-cV5pH0fXwFjkr7nM4rMovDiFlOkuO2LOky4AKS_aM-OFMwJ1d0ALm2RrYrUyeiX5NsVWankv4i6kO-rlmuWUgl4stGCD15yT2VpR2xh2aHWl22pv8tvH0ok/s514/modweeb-story1.png',
      socialShareImage: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi3ldhymvuY5I7NZbNOd9pqddg-TKz93QJmdQeObuHjNwruANsaAEl5giHrDRQXrZDtm4b-cV5pH0fXwFjkr7nM4rMovDiFlOkuO2LOky4AKS_aM-OFMwJ1d0ALm2RrYrUyeiX5NsVWankv4i6kO-rlmuWUgl4stGCD15yT2VpR2xh2aHWl22pv8tvH0ok/s514/modweeb-story1.png', // NEW DEFAULT
      icon1: '⚡', icon2: '🎨', icon3: '🔒', icon4: '🚀', icon5: '🔧', icon6: '📈',
      // Default Custom Colors
      coverColor1: '#12c2e9', coverColor2: '#c471ed',
      featuresColor1: '#ff7e5f', featuresColor2: '#feb47b',
      howToUseColor1: '#00c6ff', howToUseColor2: '#0072ff',
      finalColor1: '#f7971e', finalColor2: '#ffd200',
      coverTitle: 'انشئ قصة ويب AMP عصرية في دقائق',
      coverDescription: 'أداة مجانية لإنشاء قصص ويب احترافية متوافقة مع جميع متطلبات جوجل.',
      featuresTitle: 'لماذا تختار أداة مولد القصة؟',
      featuresIntro: 'تتميز أداة مولد قصة الويب AMP بالسرعة، الاحترافية، والتوافق الكامل مع معايير محركات البحث.',
      feature1: 'كود نظيف متوافق مع AMP',
      feature2: 'تصميم عصري وجذاب',
      feature3: 'سرعة فائقة في التحميل',
      feature4: 'دعم كامل للغة العربية',
      feature5: 'تحكم كامل بالألوان',
      feature6: 'تحسينات لمحركات البحث',
      howToUseTitle: 'كيفية استخدام الأداة في 3 خطوات بسيطة',
      step1: 'اكتب البيانات المطلوبة',
      step2: 'اضغط على زر الإنشاء',
      step3: 'انسخ الكود والصقه',
      finalTitle: 'ابدأ في إنشاء قصتك الآن!',
      finalDescription: 'اغتنم الفرصة لإنشاء محتوى قصص ويب متوافق مع جوجل، يزيد من وصولك وتواجدك في محركات البحث.',
      finalBtnText: 'ابدأ الآن مجانًا 🚀',
      finalBtnLink: 'https://modweeb.com',
      extraBtnText: 'اقرأ المزيد عن AMP Story',
      extraBtnLink: 'https://modweeb.com'
  };


  // تعريف الأنماط المسبقة (Gradients)
  const colorPalettes = {
    custom: {
        cover1: '#12c2e9', cover2: '#c471ed', 
        features1: '#ff7e5f', features2: '#feb47b', 
        howTo1: '#00c6ff', howTo2: '#0072ff', 
        final1: '#f7971e', final2: '#ffd200' 
    },
    ocean_blue: {
        cover1: '#00c6ff', cover2: '#0072ff', 
        features1: '#1cd8d2', features2: '#93edc7', 
        howTo1: '#00d2ff', howTo2: '#3a7bd5', 
        final1: '#20bf55', final2: '#01baef'
    },
    sunset: {
        cover1: '#f09819', cover2: '#ff5858', 
        features1: '#fc5c7d', features2: '#6a82fb', 
        howTo1: '#ff4b1f', howTo2: '#ff9068', 
        final1: '#ffafbd', final2: '#ffc3a0'
    },
    emerald_forest: {
        cover1: '#11998e', cover2: '#38ef7d', 
        features1: '#a8ff78', features2: '#78ffd6', 
        howTo1: '#56ab2f', howTo2: '#a8e063', 
        final1: '#1c92d2', final2: '#f1f1f1'
    },
    royal_purple: {
        cover1: '#a770ff', cover2: '#cf8bf3', 
        features1: '#c471ed', features2: '#f64f59', 
        howTo1: '#4776e6', howTo2: '#8e54e9', 
        final1: '#ba5370', final2: '#f4e2d8'
    }
  };

  function applyPreset(presetName) {
    const palette = colorPalettes[presetName];
    if (!palette) return;

    toolContainer.querySelector('#coverColor1').value = palette.cover1;
    toolContainer.querySelector('#coverColor2').value = palette.cover2;
    toolContainer.querySelector('#featuresColor1').value = palette.features1;
    toolContainer.querySelector('#featuresColor2').value = palette.features2;
    toolContainer.querySelector('#howToUseColor1').value = palette.howTo1;
    toolContainer.querySelector('#howToUseColor2').value = palette.howTo2;
    toolContainer.querySelector('#finalColor1').value = palette.final1;
    toolContainer.querySelector('#finalColor2').value = palette.final2;
  }
  
  // تطبيق القيمة الافتراضية عند التحميل
  applyPreset(colorPresetSelect.value);

  colorPresetSelect.addEventListener('change', function() {
    applyPreset(this.value);
  });
  
  // ------------------------------------------------
  // وظيفة التحكم في ظهور الصفحات الإضافية
  // ------------------------------------------------
  function updatePageVisibility() {
    const isFourPages = pagesCountSelect.value === '4';
    
    // الصفحة الثالثة (How To Use)
    if (isFourPages && howToUsePanel.dataset.removed !== 'true') {
        howToUsePanel.style.display = 'block';
        howToUseColorRows.forEach(el => el.style.display = 'block');
        howToUseAnimationRow.style.display = 'flex';
    } else {
        howToUsePanel.style.display = 'none';
        howToUseColorRows.forEach(el => el.style.display = 'none');
        howToUseAnimationRow.style.display = 'none';
    }
    
    // الصفحة الرابعة (Final Page) - يتم عرضها دائماً إذا لم تتم إزالتها
    if (finalPagePanel.dataset.removed !== 'true') {
        finalPagePanel.style.display = 'block';
        if (finalColorRows) {
          finalColorRows.style.display = 'block';
        }
        if (finalAnimationRow) {
          finalAnimationRow.style.display = 'flex';
        }
    } else {
        finalPagePanel.style.display = 'none';
        if (finalColorRows) {
          finalColorRows.style.display = 'none';
        }
        if (finalAnimationRow) {
          finalAnimationRow.style.display = 'none';
        }
    }

    // إذا كان عدد الصفحات 3، لا نحتاج لصفحة الاستخدام
    if (pagesCountSelect.value === '3') {
        howToUsePanel.style.display = 'none';
        howToUseColorRows.forEach(el => el.style.display = 'none');
        howToUseAnimationRow.style.display = 'none';
    }
  }
  
  pagesCountSelect.addEventListener('change', updatePageVisibility);

  // ------------------------------------------------
  // وظيفة الإزالة العامة
  // ------------------------------------------------
  toolContainer.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', function() {
      const target = this.dataset.target;
      let targetElement = null;

      if (target === 'feature-input-group') {
        targetElement = this.closest('.feature-input-group');
      } else {
        // لوحات الإدخال الإضافية
        targetElement = toolContainer.querySelector('#' + target);
      }
      
      if (targetElement) {
        // اخفاء العنصر بدلاً من حذفه
        targetElement.style.display = 'none';
        targetElement.dataset.removed = 'true';
        
        // إعادة عرض لوحة الألوان والحركة إذا تم إعادة تعيين عدد الصفحات 
        if (target === 'howToUsePanel' || target === 'finalPagePanel') {
             updatePageVisibility();
        }
      }
    });
  });

  // ------------------------------------------------
  // زر إعادة التعيين
  // ------------------------------------------------
  toolContainer.querySelector('#resetBtn').addEventListener('click', function() {
    storyForm.reset();
    generatedCodeEl.value = ''; // مسح الكود
    outputEl.style.display = 'none';
    copyBtnInline.style.display = 'none';
    
    // إعادة إظهار جميع العناصر التي تم إخفاؤها
    toolContainer.querySelectorAll('[data-removed="true"]').forEach(el => {
        el.style.display = ''; // يعيدها للعرض الافتراضي
        el.removeAttribute('data-removed');
    });
    
    // إعادة تعيين قيم الحقول الافتراضية
    document.getElementById('publisher').value = defaultValues.publisher;
    document.getElementById('toolLink').value = defaultValues.toolLink;
    document.getElementById('logoSrc').value = defaultValues.logoSrc;
    document.getElementById('posterSrc').value = defaultValues.posterSrc;
    socialShareImageInput.value = defaultValues.socialShareImage; // NEW
    document.getElementById('coverTitle').value = defaultValues.coverTitle;
    document.getElementById('coverDescription').value = defaultValues.coverDescription;
    document.getElementById('featuresTitle').value = defaultValues.featuresTitle;
    document.getElementById('featuresIntro').value = defaultValues.featuresIntro;
    document.getElementById('feature1').value = defaultValues.feature1;
    document.getElementById('feature2').value = defaultValues.feature2;
    document.getElementById('feature3').value = defaultValues.feature3;
    document.getElementById('feature4').value = defaultValues.feature4;
    document.getElementById('feature5').value = defaultValues.feature5;
    document.getElementById('feature6').value = defaultValues.feature6;
    document.getElementById('icon1').value = defaultValues.icon1;
    document.getElementById('icon2').value = defaultValues.icon2;
    document.getElementById('icon3').value = defaultValues.icon3;
    document.getElementById('icon4').value = defaultValues.icon4;
    document.getElementById('icon5').value = defaultValues.icon5;
    document.getElementById('icon6').value = defaultValues.icon6;
    document.getElementById('howToUseTitle').value = defaultValues.howToUseTitle;
    document.getElementById('step1').value = defaultValues.step1;
    document.getElementById('step2').value = defaultValues.step2;
    document.getElementById('step3').value = defaultValues.step3;
    document.getElementById('finalTitle').value = defaultValues.finalTitle;
    document.getElementById('finalDescription').value = defaultValues.finalDescription;
    document.getElementById('finalBtnText').value = defaultValues.finalBtnText;
    document.getElementById('finalBtnLink').value = defaultValues.finalBtnLink;
    document.getElementById('extraBtnText').value = defaultValues.extraBtnText;
    document.getElementById('extraBtnLink').value = defaultValues.extraBtnLink;
    
    // إعادة تعيين حقول الحجم والخطوط
    fontFamilySelect.value = "'Cairo', sans-serif";
    baseFontSizeInput.value = '1.0';
    contentMaxWidthInput.value = '300';
    enableBordersSelect.value = 'true';

    // إعادة تعيين الـ Preset وتطبيق الألوان الافتراضية
    colorPresetSelect.value = 'custom';
    applyPreset('custom'); // Ensure default colors are applied after reset
    
    // إعادة تعيين عوامل ضرب حجم الخط
    coverH1SizeFactor.value = '2.2'; 
    coverPSizeFactor.value = '1.0';
    featuresH2SizeFactor.value = '1.6';
    featuresPSizeFactor.value = '0.9';
    howToH2SizeFactor.value = '1.6';
    finalH1SizeFactor.value = '2.2';
    finalPSizeFactor.value = '1.0';
    finalBtnSizeFactor.value = '1.1';

    
    // تأكد من تحديث ظهور الصفحات بناءً على القيمة الافتراضية
    updatePageVisibility();
  });


  // ------------------------------------------------
  // منطق إنشاء الكود (التحديث الأهم)
  // ------------------------------------------------
  storyForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // جمع البيانات
    const title = toolContainer.querySelector('#title').value;
    const publisher = toolContainer.querySelector('#publisher').value;
    const logoSrc = toolContainer.querySelector('#logoSrc').value;
    const posterSrc = toolContainer.querySelector('#posterSrc').value;
    const socialShareImage = socialShareImageInput.value; // NEW
    const pagesCount = pagesCountSelect.value;
    const toolLink = toolContainer.querySelector('#toolLink').value;
    const fontFamily = fontFamilySelect.value;
    const enableBorders = enableBordersSelect.value === 'true';

    // بيانات الغلاف
    const coverTitle = toolContainer.querySelector('#coverTitle').value;
    const coverDescription = toolContainer.querySelector('#coverDescription').value;
    
    // بيانات المميزات
    const featuresTitle = toolContainer.querySelector('#featuresTitle').value;
    const featuresIntro = toolContainer.querySelector('#featuresIntro').value;
    
    // بيانات الصفحة الثالثة (How To Use)
    const isHowToUseActive = pagesCount === '4' && howToUsePanel.dataset.removed !== 'true';
    const howToUseTitle = toolContainer.querySelector('#howToUseTitle').value;
    const step1 = toolContainer.querySelector('#step1').value;
    const step2 = toolContainer.querySelector('#step2').value;
    const step3 = toolContainer.querySelector('#step3').value;
    
    // بيانات الصفحة النهائية (الرابعة أو الثالثة)
    const isFinalPageActive = finalPagePanel.dataset.removed !== 'true';
    const finalTitle = toolContainer.querySelector('#finalTitle').value;
    const finalDescription = toolContainer.querySelector('#finalDescription').value;
    const finalBtnText = toolContainer.querySelector('#finalBtnText').value;
    const finalBtnLink = toolContainer.querySelector('#finalBtnLink').value;
    
    // الزر الإضافي
    const isExtraButtonActive = extraButtonPanel.dataset.removed !== 'true';
    const extraBtnText = toolContainer.querySelector('#extraBtnText').value;
    const extraBtnLink = toolContainer.querySelector('#extraBtnLink').value;
    
    // إعدادات التنسيق
    const borderStyle = toolContainer.querySelector('#borderStyle').value;
    const borderWidth = toolContainer.querySelector('#borderWidth').value;
    const borderColor = toolContainer.querySelector('#borderColor').value;
    const borderRadius = toolContainer.querySelector('#borderRadius').value;
    
    // إعدادات الحجم
    const baseFontSize = parseFloat(baseFontSizeInput.value) || 1.0;
    const contentMaxWidth = parseInt(contentMaxWidthInput.value) || 300;
    
    // قيم الحدود
    const borderColorValue = enableBorders ? borderColor : 'transparent';
    const borderStyleValue = enableBorders ? borderStyle : 'none';
    const borderWidthValue = enableBorders ? `${borderWidth}px` : '0';


    // عوامل ضرب حجم الخط
    const coverH1Size = (parseFloat(coverH1SizeFactor.value) || 2.2) * baseFontSize;
    const coverPSize = (parseFloat(coverPSizeFactor.value) || 1.0) * baseFontSize;
    const featureH2Size = (parseFloat(featuresH2SizeFactor.value) || 1.6) * baseFontSize;
    const featurePSize = (parseFloat(featuresPSizeFactor.value) || 0.9) * baseFontSize;
    const howToH2Size = (parseFloat(howToH2SizeFactor.value) || 1.6) * baseFontSize;
    const howToStepSize = 0.95 * baseFontSize; 
    const howToBtnSize = 1.1 * baseFontSize; 
    const finalH1Size = (parseFloat(finalH1SizeFactor.value) || 2.2) * baseFontSize;
    const finalPSize = (parseFloat(finalPSizeFactor.value) || 1.0) * baseFontSize;
    const finalBtnSize = (parseFloat(finalBtnSizeFactor.value) || 1.1) * baseFontSize;
    
    // ألوان الحركات
    const coverAnimation = toolContainer.querySelector('#coverAnimation').value;
    const coverDuration = toolContainer.querySelector('#coverDuration').value;
    const featuresAnimation = toolContainer.querySelector('#featuresAnimation').value;
    const featuresDuration = toolContainer.querySelector('#featuresDuration').value;
    const howToUseAnimation = toolContainer.querySelector('#howToUseAnimation').value;
    const howToUseDuration = toolContainer.querySelector('#howToUseDuration').value;
    const finalAnimation = toolContainer.querySelector('#finalAnimation').value;
    const finalDuration = toolContainer.querySelector('#finalDuration').value;
    
    // الألوان
    const coverColor1 = toolContainer.querySelector('#coverColor1').value;
    const coverColor2 = toolContainer.querySelector('#coverColor2').value;
    const featuresColor1 = toolContainer.querySelector('#featuresColor1').value;
    const featuresColor2 = toolContainer.querySelector('#featuresColor2').value;
    const howToUseColor1 = toolContainer.querySelector('#howToUseColor1').value;
    const howToUseColor2 = toolContainer.querySelector('#howToUseColor2').value;
    const finalColor1 = toolContainer.querySelector('#finalColor1').value;
    const finalColor2 = toolContainer.querySelector('#finalColor2').value;
    
    // ------------------------------------------------
    // تجميع المميزات (Features) - نمط القائمة العمودين المصغرة (المعتمد)
    // ------------------------------------------------
    let featuresHTML = '';
    const featureGroups = toolContainer.querySelectorAll('.feature-input-group');
    let delay = 0.2; // التأخير الأولي لحركة المميزات
    
    featureGroups.forEach(group => {
      // تجاهل الميزات التي تم إخفاؤها (إزالتها)
      if (group.dataset.removed === 'true') return;
      
      const id = group.dataset.id;
      const featureText = toolContainer.querySelector('#feature' + id).value;
      const iconCode = toolContainer.querySelector('#icon' + id).value;

      // تجاهل المميزات الفارغة
      if (!featureText) return; 
      
      const animationType = (id % 2 !== 0) ? 'fly-in-left' : 'fly-in-right'; // تبديل الحركة
      
      // نمط القائمة المصغرة (عمودين وبدون خلفية صندوق) - FIXED
      featuresHTML += `
        <div animate-in="${animationType}" animate-in-delay="${delay.toFixed(1)}s"
             style="display: flex; align-items: flex-start; gap: 10px; padding: 10px 0; border-bottom: 1px dashed rgba(255,255,255,0.3);">
          <div style="color: #fff; font-size: ${1.3 * baseFontSize}em; font-weight: bold; line-height: 1;">${iconCode}</div>
          <div style="color: #fff; font-size: ${featurePSize}em; font-weight: 500; margin-top: 3px; line-height: 1.4;">${featureText}</div>
        </div>
      `;
      delay += 0.1;
    });

    const isFeaturesActive = featuresHTML.trim().length > 0;
    
    // ------------------------------------------------
    // تجميع محتوى الصفحة النهائية
    // ------------------------------------------------
    let finalButtonHTML = '';
    // تم إبقاء أسلوب pulse في amp-custom المرفقة مع الكود كتعليمات
    const finalBtnStyle = `display: inline-block; background: #fff; color: ${finalColor1}; padding: 12px 30px; border-radius: 35px; text-decoration: none; font-weight: bold; box-shadow: 0 4px 15px rgba(0,0,0,0.2); transition: all 0.3s ease; font-size: ${finalBtnSize}em; margin-top: 20px; animation: pulse 2s infinite; border: ${borderWidthValue} ${borderStyleValue} ${borderColorValue};`;

    if (isFinalPageActive && finalBtnText && finalBtnLink) {
        finalButtonHTML = `
           <a href="${finalBtnLink}" style="${finalBtnStyle}">
             ${finalBtnText}
           </a>
        `;
    } else if (toolLink) {
        // زر افتراضي إذا لم يتم إدخال بيانات الزر النهائي المخصص
        finalButtonHTML = `
           <a href="${toolLink}" style="${finalBtnStyle}">
             ${toolLink.startsWith('http') ? 'انتقل إلى الأداة' : 'المزيد من التفاصيل'} 🚀
           </a>
        `;
    }
    
    let extraButtonHtml = '';
    const extraBtnFontSize = 1.0 * baseFontSize;
    const extraBtnBorderStyle = enableBorders ? `${borderWidthValue} ${borderStyleValue} #fff` : '2px solid transparent';
    if (isExtraButtonActive && extraBtnText && extraBtnLink) {
        extraButtonHtml = `
            <a href="${extraBtnLink}" 
               style="display: inline-block; background: transparent; color: #fff; padding: 10px 25px; border-radius: 35px; text-decoration: none; font-weight: bold; transition: all 0.3s ease; font-size: ${extraBtnFontSize}em; border: ${extraBtnBorderStyle}; margin-top: 10px;">
              ${extraBtnText}
            </a>`;
    }
    
    // دالة لتجنب الخطأ src="" وتصحيح البروتوكول (إضافة http/https إذا مفقود)
    const safeSrc = (src) => {
        if (!src) return 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
        // للتأكد من البروتوكول الصالح
        if (!src.startsWith('http://') && !src.startsWith('https://')) {
            // إضافة https:// كافتراض إذا لم يكن موجودًا
            return 'https://' + src.replace(/^(\/\/)?/, ''); 
        }
        return src;
    };

    // ------------------------------------------------
    // بناء كود الـ AMP Story الرئيسي (خالٍ من الأكواد الخارجية)
    // ------------------------------------------------
    let storyContent = '';
    
    // ----------------- الصفحة 1: الغلاف -----------------
    let nextPageID = isFeaturesActive ? 'features' : (isHowToUseActive ? 'how-to-use' : (isFinalPageActive ? 'final-page' : ''));
    
    storyContent += `
  <amp-story-page id="cover" ${nextPageID ? `auto-advance-after="6s"` : ''}>
    <amp-story-grid-layer template="fill">
      <div style="background: linear-gradient(135deg, ${coverColor1} 0%, ${coverColor2} 100%);"></div>
      ${posterSrc ? `<amp-img src="${safeSrc(posterSrc)}" layout="fill" style="object-fit: cover;" placeholder></amp-img>` : ''}
    </amp-story-grid-layer>
    
    <amp-story-grid-layer template="vertical" style="align-content: center; justify-content: center;">
      <div animate-in="${coverAnimation}" animate-in-duration="${coverDuration}s" 
           style="text-align: center; padding: 20px; border-radius: ${borderRadius}px; max-width: ${contentMaxWidth}px; width: 85%; margin: 15% auto 0 auto;">
        <h1 style="color: white; font-size: ${coverH1Size}em; margin-bottom: 12px; text-shadow: 0 2px 8px rgba(0,0,0,0.2); line-height: 1.1;">${coverTitle}</h1>
        <p style="color: rgba(255,255,255,0.9); font-size: ${coverPSize}em; line-height: 1.3;">${coverDescription}</p>
      </div>
    </amp-story-grid-layer>
    
    <amp-story-grid-layer template="vertical" style="pointer-events: none;">
      <div style="position: absolute; top: 30px; right: 15px; display: flex; align-items: center; pointer-events: auto;">
        <amp-img src="${safeSrc(logoSrc)}" 
                 width="35" height="35" layout="fixed"
                 style="border-radius: 50%; border: 2px solid white; object-fit: cover;"
                 alt="شعار ${publisher}"></amp-img>
        <div style="color: white; font-size: ${0.8 * baseFontSize}em; font-weight: 500; margin-left: 8px; border-radius: 18px; padding: 4px 10px; background: rgba(0,0,0,0.15);">${publisher}</div>
      </div>
    </amp-story-grid-layer>
  </amp-story-page>
    `;
    
    // ----------------- الصفحة 2: المميزات -----------------
    if (isFeaturesActive) {
      nextPageID = isHowToUseActive ? 'how-to-use' : (isFinalPageActive ? 'final-page' : '');
      
      storyContent += `
  <amp-story-page id="features" ${nextPageID ? `auto-advance-after="6s"` : ''}>
    <amp-story-grid-layer template="fill">
      <div style="background: linear-gradient(to right, ${featuresColor1}, ${featuresColor2});"></div>
    </amp-story-grid-layer>
    
    <amp-story-grid-layer template="vertical" style="align-content: start; padding: 20px;">
        <div animate-in="${featuresAnimation}" animate-in-duration="${featuresDuration}s" 
             style="text-align: center; padding-bottom: 15px; margin: 15% auto 0 auto; width: 100%; max-width: ${contentMaxWidth + 50}px;">
            <h2 style="color: #fff; font-size: ${featureH2Size}em; margin: 0 0 10px; text-shadow: 0 2px 4px rgba(0,0,0,0.1); text-align: center; line-height: 1.1;">${featuresTitle}</h2>
            ${featuresIntro ? `<p style="color: #fff; font-size: ${featurePSize}em; margin-bottom: 20px; text-align: center; opacity: 0.8; line-height: 1.3;">${featuresIntro}</p>` : ''}
        </div>

        <div animate-in="${featuresAnimation}" animate-in-duration="${featuresDuration}s"
             style="padding: 0 10px; margin: 0 auto; max-width: ${contentMaxWidth + 50}px; width: 100%;">
            <div style="display: grid; 
                        grid-template-columns: repeat(2, 1fr); 
                        gap: 0 15px; 
                        margin-top: 10px; 
                        justify-content: center;
                        background: rgba(255, 255, 255, 0.1); /* خلفية شفافة زجاجية */
                        backdrop-filter: blur(12px); 
                        border-radius: ${borderRadius}px; 
                        padding: 10px 15px;
                        border: ${borderWidthValue} ${borderStyleValue} ${borderColorValue};">
              ${featuresHTML}
            </div>
        </div>
      
      <div animate-in="fade-in" style="position: absolute; bottom: 30px; width: 100%; text-align: center;">
        <span style="color: rgba(255,255,255,0.7); font-size: ${0.95 * baseFontSize}em; display: block; margin-bottom: 8px;">القادم: ${isHowToUseActive ? 'كيفية الاستخدام' : (isFinalPageActive ? 'الصفحة النهائية' : '')}</span>
      </div>
    </amp-story-grid-layer>
  </amp-story-page>
      `;
    }

    // ----------------- الصفحة 3 (اختيارية): كيفية الاستخدام -----------------
    if (isHowToUseActive) {
        const pageID = 'how-to-use';
        nextPageID = isFinalPageActive ? 'final-page' : '';
        
        storyContent += `
  <amp-story-page id="${pageID}" ${nextPageID ? `auto-advance-after="6s"` : ''}>
    <amp-story-grid-layer template="fill">
      <div style="background: linear-gradient(to bottom, ${howToUseColor1}, ${howToUseColor2});"></div>
    </amp-story-grid-layer>
    
    <amp-story-grid-layer template="vertical" style="align-content: start; padding: 20px;">
        <div style="margin: 15% auto 0 auto; width: 100%; max-width: ${contentMaxWidth}px; text-align: center;">
            <h2 animate-in="fade-in" style="color: #fff; margin: 0 0 25px; font-size: ${howToH2Size}em; text-shadow: 0 2px 4px rgba(0,0,0,0.1); line-height: 1.1;">${howToUseTitle}</h2>
        </div>
        
      <div animate-in="${howToUseAnimation}" animate-in-duration="${howToUseDuration}s" 
           style="background: rgba(255,255,255,0.1); backdrop-filter: blur(12px); border-radius: 24px; border: 1px solid rgba(255,255,255,0.25); box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15); padding: 30px; text-align: center; margin: 10px auto; max-width: ${contentMaxWidth + 50}px; width: 100%; border: ${borderWidthValue} ${borderStyleValue} ${borderColorValue};">
        
        <div style="display: flex; justify-content: center; gap: 20px; margin: 30px 0;">
          <div animate-in="fly-in-left" animate-in-delay="0.2s" style="flex: 1; max-width: 100px;">
            <div style="background: rgba(255,255,255,0.2); border-radius: 50%; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; font-weight: bold; color: #fff; font-size: ${1.5 * baseFontSize}em;">1</div>
            <div style="color: #fff; font-size: ${howToStepSize}em;">${step1}</div>
          </div>
          <div animate-in="fly-in-top" animate-in-delay="0.3s" style="flex: 1; max-width: 100px;">
            <div style="background: rgba(255,255,255,0.2); border-radius: 50%; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; font-weight: bold; color: #fff; font-size: ${1.5 * baseFontSize}em;">2</div>
            <div style="color: #fff; font-size: ${howToStepSize}em;">${step2}</div>
          </div>
          <div animate-in="fly-in-right" animate-in-delay="0.4s" style="flex: 1; max-width: 100px;">
            <div style="background: rgba(255,255,255,0.2); border-radius: 50%; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; font-weight: bold; color: #fff; font-size: ${1.5 * baseFontSize}em;">3</div>
            <div style="color: #fff; font-size: ${howToStepSize}em;">${step3}</div>
          </div>
        </div>
        
        <div style="margin-top: 20px;">
          <a href="${toolLink}" 
             style="display: inline-block; background: #fff; color: ${howToUseColor1}; border: none; padding: 12px 30px; border-radius: 20px; font-weight: bold; text-decoration: none; box-shadow: 0 5px 15px rgba(0,0,0,0.2); transition: all 0.3s ease; font-size: ${howToBtnSize}em; border: ${borderWidthValue} ${borderStyleValue} ${borderColorValue};">
            جرب الأداة الآن
          </a>
        </div>
      </div>
      
      <div animate-in="fade-in" style="position: absolute; bottom: 30px; width: 100%; text-align: center;">
        <span style="color: rgba(255,255,255,0.7); font-size: ${0.95 * baseFontSize}em; display: block; margin-bottom: 8px;">القادم: الصفحة النهائية</span>
      </div>
    </amp-story-grid-layer>
  </amp-story-page>
        `;
    }

    // ----------------- الصفحة الأخيرة: النهائية -----------------
    if (isFinalPageActive) {
        const pageID = 'final-page';
        
        storyContent += `
  <amp-story-page id="${pageID}" auto-advance-after="10s">
    <amp-story-grid-layer template="fill">
      <div style="background: linear-gradient(to right, ${finalColor1}, ${finalColor2});"></div>
    </amp-story-grid-layer>
    
    <amp-story-grid-layer template="vertical" style="align-content: center; justify-content: center; padding: 20px;">
      <div animate-in="${finalAnimation}" animate-in-duration="${finalDuration}s" 
           style="text-align: center; border-radius: ${borderRadius}px; padding: 20px; margin: 10px auto; max-width: ${contentMaxWidth}px;">
        <h1 style="color: #fff; font-size: ${finalH1Size}em; margin-bottom: 15px; text-shadow: 0 3px 8px rgba(0,0,0,0.2); line-height: 1.1;">
        ${finalTitle || 'شكراً لمتابعتكم!'}
        </h1>
        <p style="color: rgba(255,255,255,0.9); margin: 20px 0; font-size: ${finalPSize}em; line-height: 1.5;">
          ${finalDescription || 'يمكنك الوصول إلى الأداة عن طريق الزر أدناه.'}
        </p>
        
        ${finalButtonHTML}
        
        ${extraButtonHtml}

      </div>
    </amp-story-grid-layer>
  </amp-story-page>
        `;
    }

    // ----------------- بناء كود الـ AMP Story الرئيسي (مُحدّث ليتضمن Meta Tags) -----------------
    const finalCode = `
    
<amp-story standalone
    title="${title}"
    publisher="${publisher}"
    publisher-logo-src="${safeSrc(logoSrc)}"
    poster-portrait-src="${safeSrc(posterSrc)}">

${storyContent.trim()}

</amp-story>
    `;

    // عرض الكود المُنشأ
    generatedCodeEl.value = finalCode.trim();
    outputEl.style.display = 'block';
    copyBtnInline.style.display = 'flex';
  });

  // تشغيل وظيفة تحديث الصفحات عند التحميل الأولي
  updatePageVisibility();

})(); 

// وظيفة عامة لنسخ الكود (تبقى في النطاق العام)
function copyCodeV3() {
  const codeEl = document.querySelector('#amp-story-generator-tool #generatedCode');
  if (codeEl) {
    codeEl.select();
    try {
      document.execCommand('copy');
      alert('تم نسخ الكود بنجاح! تذكر إضافة الخطوط الخارجية ونمط pulse و Meta Tags في وسم <head> من ملف AMP Story الرئيسي.');
    } catch (err) {
      alert('فشل النسخ. الرجاء النسخ يدويًا.');
    }
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    } else if (document.selection) {
      document.selection.empty();
    }
  }
}
