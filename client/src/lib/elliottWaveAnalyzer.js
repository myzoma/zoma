class ElliottWaveAnalyzer {
    constructor(config = {}) {
        this.config = {
            len1: config.len1 || 4,
            len2: config.len2 || 8,
            len3: config.len3 || 16,
            minWaveLength: config.minWaveLength || 0.5,
            maxWaveLength: config.maxWaveLength || 5.0,
            // نسب فيبوناتشي الدقيقة
            fib236: 0.236,
            fib382: 0.382,
            fib500: 0.500,
            fib618: 0.618,
            fib764: 0.764,
            fib854: 0.854,
            fib1000: 1.000,
            fib1272: 1.272,
            fib1618: 1.618,
            fib2618: 2.618
        };
        
        this.elliottRules = {
            motive: {
                wave2CannotExceedWave1Start: true,
                wave3NotShortest: true,
                wave4CannotOverlapWave1: true,
                impulsiveWavesSameDirection: true
            },
            corrective: {
                waveCRelationToA: true,
                waveBMaxRetracement: true
            }
        };
    }

    // حساب Pivot High و Pivot Low بدقة أكبر مع تحسين الحساسية
    findPivots(data, leftBars = 3, rightBars = 3) {
        const pivots = [];
        
        for (let i = leftBars; i < data.length - rightBars; i++) {
            const current = data[i];
            let isHigh = true;
            let isLow = true;
            
            // فحص Pivot High
            for (let j = i - leftBars; j <= i + rightBars; j++) {
                if (j !== i && data[j].high >= current.high) {
                    isHigh = false;
                    break;
                }
            }
            
            // فحص Pivot Low
            for (let j = i - leftBars; j <= i + rightBars; j++) {
                if (j !== i && data[j].low <= current.low) {
                    isLow = false;
                    break;
                }
            }
            
            if (isHigh) {
                pivots.push({
                    index: i,
                    type: 'high',
                    price: current.high,
                    time: current.time,
                    candle: current
                });
            }
            
            if (isLow) {
                pivots.push({
                    index: i,
                    type: 'low',
                    price: current.low,
                    time: current.time,
                    candle: current
                });
            }
        }
        
        return pivots.sort((a, b) => a.index - b.index);
    }

    // إنشاء ZigZag محسن مع فلترة الضوضاء بحساسية أفضل
    createZigZag(pivots, minChangePercent = 0.5) {
        if (pivots.length < 2) return [];
        
        const zigzag = [pivots[0]];
        
        for (let i = 1; i < pivots.length; i++) {
            const current = pivots[i];
            const last = zigzag[zigzag.length - 1];
            
            const changePercent = Math.abs((current.price - last.price) / last.price) * 100;
            
            if (changePercent < minChangePercent) continue;
            
            if (current.type !== last.type) {
                zigzag.push(current);
            } else if (current.type === 'high' && current.price > last.price) {
                zigzag[zigzag.length - 1] = current;
            } else if (current.type === 'low' && current.price < last.price) {
                zigzag[zigzag.length - 1] = current;
            }
        }
        
        return zigzag;
    }

    // تحليل نماذج الموجات
    analyzeWavePatterns(zigzag) {
        const patterns = [];
        
        // البحث عن نماذج الموجات الدافعة (1-2-3-4-5)
        for (let i = 0; i <= zigzag.length - 6; i++) {
            const points = zigzag.slice(i, i + 6);
            const motivePattern = this.identifyMotivePattern(points);
            if (motivePattern) {
                patterns.push(motivePattern);
            }
        }
        
        // البحث عن نماذج الموجات التصحيحية (A-B-C)
        for (let i = 0; i <= zigzag.length - 4; i++) {
            const points = zigzag.slice(i, i + 4);
            const correctivePattern = this.identifyCorrectivePattern(points);
            if (correctivePattern) {
                patterns.push(correctivePattern);
            }
        }
        
        return patterns.sort((a, b) => b.confidence - a.confidence);
    }

    // تحديد النمط الدافع (12345)
    identifyMotivePattern(points) {
        if (points.length !== 6) return null;
        
        const [p0, p1, p2, p3, p4, p5] = points;
        
        // التحقق من التناوب الصحيح
        if (!this.checkAlternation(points)) return null;
        
        const isBullish = p5.price > p0.price;
        
        // حساب أطوال الموجات
        const waves = {
            w1: { 
                start: p0, 
                end: p1, 
                length: this.calculateWaveLength(p0, p1),
                percentage: this.calculatePercentageChange(p0.price, p1.price)
            },
            w2: { 
                start: p1, 
                end: p2, 
                length: this.calculateWaveLength(p1, p2),
                percentage: this.calculatePercentageChange(p1.price, p2.price),
                retracement: this.calculateRetracement(p0, p1, p2)
            },
            w3: { 
                start: p2, 
                end: p3, 
                length: this.calculateWaveLength(p2, p3),
                percentage: this.calculatePercentageChange(p2.price, p3.price)
            },
            w4: { 
                start: p3, 
                end: p4, 
                length: this.calculateWaveLength(p3, p4),
                percentage: this.calculatePercentageChange(p3.price, p4.price),
                retracement: this.calculateRetracement(p2, p3, p4)
            },
            w5: { 
                start: p4, 
                end: p5, 
                length: this.calculateWaveLength(p4, p5),
                percentage: this.calculatePercentageChange(p4.price, p5.price)
            }
        };
        
        // التحقق من قواعد Elliott Wave
        const validation = this.validateMotiveWaveRules(points);
        if (!validation.isValid) return null;
        
        // تحليل نسب فيبوناتشي
        const fibonacciAnalysis = this.analyzeFibonacciRelationships(waves);
        
        return {
            type: 'motive',
            direction: isBullish ? 'bullish' : 'bearish',
            points: points,
            waves: waves,
            validation: validation,
            fibonacciAnalysis: fibonacciAnalysis,
            confidence: this.calculatePatternConfidence(waves, validation, fibonacciAnalysis),
            targets: this.calculateMotiveTargets(waves, isBullish)
        };
    }

    // تحديد النمط التصحيحي (ABC)
    identifyCorrectivePattern(points) {
        if (points.length !== 4) return null;
        
        const [pA, pB, pC, pD] = points;
        
        if (!this.checkAlternation(points)) return null;
        
        const isBullishCorrection = pA.type === 'high' && pD.type === 'low';
        const isBearishCorrection = pA.type === 'low' && pD.type === 'high';
        
        if (!isBullishCorrection && !isBearishCorrection) return null;
        
        const waves = {
            wA: { 
                start: pA,
                end: pB, 
                length: this.calculateWaveLength(pA, pB),
                percentage: this.calculatePercentageChange(pA.price, pB.price)
            },
            wB: { 
                start: pB, 
                end: pC, 
                length: this.calculateWaveLength(pB, pC),
                percentage: this.calculatePercentageChange(pB.price, pC.price),
                retracement: this.calculateRetracement(pA, pB, pC)
            },
            wC: { 
                start: pC, 
                end: pD, 
                length: this.calculateWaveLength(pC, pD),
                percentage: this.calculatePercentageChange(pC.price, pD.price)
            }
        };
        
        const validation = this.validateCorrectivePattern(waves, isBullishCorrection);
        if (!validation.isValid) return null;
        
        const fibonacciAnalysis = this.analyzeCorrectiveFibonacci(waves);
        
        return {
            type: 'corrective',
            direction: isBullishCorrection ? 'bearish' : 'bullish',
            points: points,
            waves: waves,
            validation: validation,
            fibonacciAnalysis: fibonacciAnalysis,
            confidence: this.calculateCorrectiveConfidence(waves, validation, fibonacciAnalysis),
            targets: this.calculateCorrectiveTargets(waves, !isBullishCorrection)
        };
    }

    // التحقق من تناوب الاتجاهات
    checkAlternation(points) {
        for (let i = 1; i < points.length; i++) {
            if (points[i].type === points[i-1].type) {
                return false;
            }
        }
        return true;
    }

    // التحقق من قواعد الموجات الدافعة
    validateMotiveWaveRules(points) {
        const [p0, p1, p2, p3, p4, p5] = points;
        const isBullish = p5.price > p0.price;
        
        const rule1 = isBullish ? p2.price > p0.price : p2.price < p0.price;
        
        const w1 = this.calculateWaveLength(p0, p1);
        const w3 = this.calculateWaveLength(p2, p3);
        const w5 = this.calculateWaveLength(p4, p5);
        const rule2 = w3 >= Math.max(w1, w5) || (w3 >= w1 && w3 >= w5);
        
        const rule3 = isBullish ? p4.price > p1.price : p4.price < p1.price;
        
        const alternation = this.checkAlternation(points);
        
        return {
            rule1: rule1,
            rule2: rule2,
            rule3: rule3,
            alternation: alternation,
            isValid: rule1 && rule2 && rule3 && alternation
        };
    }

    // التحقق من قواعد النمط التصحيحي
    validateCorrectivePattern(waves, isBullishCorrection) {
        const rule1 = waves.wB.retracement <= 1.0;
        const wCToWARatio = waves.wC.length / waves.wA.length;
        const rule2 = wCToWARatio >= 0.618;
        const rule3 = wCToWARatio <= 2.618;
        const rule4 = isBullishCorrection ? 
            (waves.wA.start.price > waves.wC.end.price) : 
            (waves.wA.start.price < waves.wC.end.price);
        
        return {
            rule1: rule1,
            rule2: rule2,
            rule3: rule3,
            rule4: rule4,
            isValid: rule1 && rule2 && rule3 && rule4
        };
    }

    // حساب طول الموجة
    calculateWaveLength(startPoint, endPoint) {
        return Math.abs(endPoint.price - startPoint.price);
    }

    // حساب نسبة التغيير
    calculatePercentageChange(startPrice, endPrice) {
        return ((endPrice - startPrice) / startPrice) * 100;
    }

    // حساب نسبة التصحيح
    calculateRetracement(start, peak, end) {
        const totalMove = peak.price - start.price;
        const retracement = peak.price - end.price;
        return Math.abs(retracement / totalMove);
    }

    // تحليل علاقات فيبوناتشي
    analyzeFibonacciRelationships(waves) {
        const analysis = {};
        
        const w2Retracement = waves.w2.retracement;
        analysis.wave2 = {
            retracement: w2Retracement,
            fibLevel: this.findClosestFibLevel(w2Retracement),
            isValid: w2Retracement >= 0.236 && w2Retracement <= 0.786
        };
        
        const w3ToW1Ratio = waves.w3.length / waves.w1.length;
        analysis.wave3 = {
            ratio: w3ToW1Ratio,
            fibLevel: this.findClosestFibLevel(w3ToW1Ratio),
            isValid: w3ToW1Ratio >= 1.0 && w3ToW1Ratio <= 2.618
        };
        
        const w4Retracement = waves.w4.retracement;
        analysis.wave4 = {
            retracement: w4Retracement,
            fibLevel: this.findClosestFibLevel(w4Retracement),
            isValid: w4Retracement >= 0.236 && w4Retracement <= 0.618
        };
        
        const w5ToW1Ratio = waves.w5.length / waves.w1.length;
        analysis.wave5 = {
            ratio: w5ToW1Ratio,
            fibLevel: this.findClosestFibLevel(w5ToW1Ratio),
            isValid: w5ToW1Ratio >= 0.618 && w5ToW1Ratio <= 1.618
        };
        
        return analysis;
    }

    // تحليل نسب فيبوناتشي للتصحيح
    analyzeCorrectiveFibonacci(waves) {
        const analysis = {};
        
        const wBRetracement = waves.wB.retracement;
        analysis.waveB = {
            retracement: wBRetracement,
            fibLevel: this.findClosestFibLevel(wBRetracement),
            isValid: wBRetracement >= 0.236 && wBRetracement <= 0.786
        };
        
        const wCToWARatio = waves.wC.length / waves.wA.length;
        analysis.waveC = {
            ratio: wCToWARatio,
            fibLevel: this.findClosestFibLevel(wCToWARatio),
            isValid: wCToWARatio >= 0.618 && wCToWARatio <= 1.618
        };
        
        return analysis;
    }

    // العثور على أقرب مستوى فيبوناتشي
    findClosestFibLevel(value) {
        const fibLevels = [0.236, 0.382, 0.500, 0.618, 0.764, 1.000, 1.272, 1.618, 2.618];
        let closest = fibLevels[0];
        let minDiff = Math.abs(value - closest);
        
        for (const level of fibLevels) {
            const diff = Math.abs(value - level);
            if (diff < minDiff) {
                minDiff = diff;
                closest = level;
            }
        }
        
        return closest;
    }

    // حساب مستوى الثقة للنمط الدافع
    calculatePatternConfidence(waves, validation, fibonacciAnalysis) {
        let confidence = 0;
        
        if (validation.rule1) confidence += 25;
        if (validation.rule2) confidence += 30;
        if (validation.rule3) confidence += 25;
        if (validation.alternation) confidence += 10;
        
        if (fibonacciAnalysis.wave2.isValid) confidence += 2.5;
        if (fibonacciAnalysis.wave3.isValid) confidence += 2.5;
        if (fibonacciAnalysis.wave4.isValid) confidence += 2.5;
        if (fibonacciAnalysis.wave5.isValid) confidence += 2.5;
        
        return Math.min(confidence, 100);
    }

    // حساب مستوى الثقة للنمط التصحيحي
    calculateCorrectiveConfidence(waves, validation, fibonacciAnalysis) {
        let confidence = 0;
        
        if (validation.rule1) confidence += 25;
        if (validation.rule2) confidence += 25;
        if (validation.rule3) confidence += 25;
        if (validation.rule4) confidence += 15;
        
        if (fibonacciAnalysis.waveB.isValid) confidence += 5;
        if (fibonacciAnalysis.waveC.isValid) confidence += 5;
        
        return Math.min(confidence, 100);
    }

    // حساب أهداف النمط الدافع
    calculateMotiveTargets(waves, isBullish) {
        const w1Length = waves.w1.length;
        const w3Length = waves.w3.length;
        const startPrice = waves.w5.start.price;
        const direction = isBullish ? 1 : -1;
        
        return {
            wave5_fib618: startPrice + (direction * w1Length * this.config.fib618),
            wave5_fib1000: startPrice + (direction * w1Length * this.config.fib1000),
            wave5_fib1618: startPrice + (direction * w1Length * this.config.fib1618),
            wave5_w3_fib382: startPrice + (direction * w3Length * this.config.fib382),
            wave5_w3_fib618: startPrice + (direction * w3Length * this.config.fib618),
            finalTarget: waves.w5.end.price,
            support: Math.min(waves.w2.end.price, waves.w4.end.price),
            resistance: Math.max(waves.w1.end.price, waves.w3.end.price, waves.w5.end.price)
        };
    }

    // حساب أهداف النمط التصحيحي
    calculateCorrectiveTargets(waves, isBullish) {
        const wALength = waves.wA.length;
        const startPrice = waves.wC.start.price;
        const direction = isBullish ? 1 : -1;
        
        return {
            waveC_fib618: startPrice + (direction * wALength * this.config.fib618),
            waveC_fib1000: startPrice + (direction * wALength * this.config.fib1000),
            waveC_fib1272: startPrice + (direction * wALength * this.config.fib1272),
            waveC_fib1618: startPrice + (direction * wALength * this.config.fib1618),
            finalTarget: waves.wC.end.price,
            support: isBullish ? waves.wA.start.price : waves.wC.end.price,
            resistance: isBullish ? waves.wC.end.price : waves.wA.start.price
        };
    }

    // التحليل الرئيسي
    // تحديد الموجة الحالية والطول المتوقع
    getCurrentWaveDirection(patterns, currentPrice) {
        if (!patterns || patterns.length === 0) {
            return null;
        }

        const latestPattern = patterns[patterns.length - 1];
        
        if (latestPattern.type === 'corrective') {
            const { waves, direction } = latestPattern;
            const waveA = waves.wA;
            const waveB = waves.wB;
            const waveC = waves.wC;
            
            // تحديد أين نحن في النمط التصحيحي ABC
            if (currentPrice > Math.min(waveA.end.price, waveB.end.price) && 
                currentPrice < Math.max(waveA.end.price, waveB.end.price)) {
                // نحن في منتصف الموجة B
                return {
                    currentWave: 'B',
                    direction: direction === 'bullish' ? 'صاعد' : 'هابط',
                    expectedTarget: waveB.end.price,
                    expectedLength: Math.abs(waveB.end.price - currentPrice),
                    completion: this.calculateWaveCompletion(waveB.start.price, waveB.end.price, currentPrice),
                    nextWave: 'C',
                    confidence: latestPattern.confidence
                };
            } else if (Math.abs(currentPrice - waveC.start.price) < Math.abs(currentPrice - waveA.start.price)) {
                // نحن في الموجة C أو قريبون منها
                return {
                    currentWave: 'C',
                    direction: direction === 'bullish' ? 'صاعد' : 'هابط',
                    expectedTarget: waveC.end.price,
                    expectedLength: Math.abs(waveC.end.price - currentPrice),
                    completion: this.calculateWaveCompletion(waveC.start.price, waveC.end.price, currentPrice),
                    nextWave: 'انتهاء النمط التصحيحي',
                    confidence: latestPattern.confidence
                };
            } else {
                // نحن في الموجة A
                return {
                    currentWave: 'A',
                    direction: direction === 'bullish' ? 'هابط' : 'صاعد', // عكس الاتجاه العام للتصحيح
                    expectedTarget: waveA.end.price,
                    expectedLength: Math.abs(waveA.end.price - currentPrice),
                    completion: this.calculateWaveCompletion(waveA.start.price, waveA.end.price, currentPrice),
                    nextWave: 'B',
                    confidence: latestPattern.confidence
                };
            }
        } else if (latestPattern.type === 'motive') {
            const { waves, direction } = latestPattern;
            
            // تحديد أين نحن في الموجات الدافعة 1-2-3-4-5
            const currentDistanceToW5 = Math.abs(currentPrice - waves.w5.end.price);
            const currentDistanceToW4 = Math.abs(currentPrice - waves.w4.end.price);
            const currentDistanceToW3 = Math.abs(currentPrice - waves.w3.end.price);
            
            if (currentDistanceToW5 < currentDistanceToW4) {
                return {
                    currentWave: '5',
                    direction: direction === 'bullish' ? 'صاعد' : 'هابط',
                    expectedTarget: waves.w5.end.price,
                    expectedLength: Math.abs(waves.w5.end.price - currentPrice),
                    completion: this.calculateWaveCompletion(waves.w5.start.price, waves.w5.end.price, currentPrice),
                    nextWave: 'تصحيح ABC',
                    confidence: latestPattern.confidence
                };
            } else if (currentDistanceToW4 < currentDistanceToW3) {
                return {
                    currentWave: '4',
                    direction: direction === 'bullish' ? 'هابط' : 'صاعد', // موجة تصحيحية
                    expectedTarget: waves.w4.end.price,
                    expectedLength: Math.abs(waves.w4.end.price - currentPrice),
                    completion: this.calculateWaveCompletion(waves.w4.start.price, waves.w4.end.price, currentPrice),
                    nextWave: '5',
                    confidence: latestPattern.confidence
                };
            } else {
                return {
                    currentWave: '3',
                    direction: direction === 'bullish' ? 'صاعد' : 'هابط',
                    expectedTarget: waves.w3.end.price,
                    expectedLength: Math.abs(waves.w3.end.price - currentPrice),
                    completion: this.calculateWaveCompletion(waves.w3.start.price, waves.w3.end.price, currentPrice),
                    nextWave: '4',
                    confidence: latestPattern.confidence
                };
            }
        }
        
        return null;
    }

    // حساب نسبة اكتمال الموجة
    calculateWaveCompletion(startPrice, endPrice, currentPrice) {
        const totalDistance = Math.abs(endPrice - startPrice);
        const currentDistance = Math.abs(currentPrice - startPrice);
        return Math.min(100, (currentDistance / totalDistance) * 100);
    }

    analyze(data) {
        try {
            // العثور على النقاط المحورية
            const pivots = this.findPivots(data);
            
            // إنشاء ZigZag
            const zigzag = this.createZigZag(pivots, 1.5);
            
            // تحليل الأنماط
            const patterns = this.analyzeWavePatterns(zigzag);
            
            // تحديد الموجة الحالية
            const currentPrice = data[data.length - 1].close;
            const currentWave = this.getCurrentWaveDirection(patterns, currentPrice);
            
            // إرجاع النتائج
            return {
                success: true,
                pivots: pivots,
                zigzag: zigzag,
                patterns: patterns,
                currentWave: currentWave,
                currentPrice: currentPrice,
                summary: {
                    totalPatterns: patterns.length,
                    motivePatterns: patterns.filter(p => p.type === 'motive').length,
                    correctivePatterns: patterns.filter(p => p.type === 'corrective').length,
                    averageConfidence: patterns.length > 0 ? 
                        patterns.reduce((sum, p) => sum + p.confidence, 0) / patterns.length : 0
                }
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                patterns: [],
                currentWave: null,
                summary: null
            };
        }
    }
}

export default ElliottWaveAnalyzer;