const td = `
$ Site - 434013_NIZWA1_3G, K0001
$ Analysed by SQ 
$ Date 08/12/2021

TITL1  32.0m TOWER 
TITL2
UNITS 1 $ 1=METRIC   4=US

PROFILE  
FACES 4 
WBASE 4.185
RLBAS 0

$SECTION 5

PANEL 0504 HT 1.5 TW 2.302
FACE X LEG 1054 BR1 2054 H1 3054
PLAN PLD PB1 0 PB2 5054 TOP $PB2 IS CONSIDERED SMALLER SECTION FOR COMPLETE INNER DIMOND 
BOLT LEG 0 BR1 1 M16-8 H1 2 M16-8 PB 1 M16-8

PANEL 0503 HT 1.5
FACE XO LEG 1053 BR1 2053 
BOLT LEG 0 BR1 1 M16-8  

PANEL 0502 HT 1.5
FACE XO LEG 1052 BR1 2052
PLAN PLD PB1 5052 PB2 5053 TOP $PB2 IS CONSIDERED SMALLER SECTION FOR COMPLETE INNER DIMOND 
BOLT LEG 0 BR1 1 M16-8 PB 1 M16-8 

PANEL 0501 HT 1.5
FACE XO LEG 1051 BR1 2051 
BOLT LEG 6 M16-82 BR1 1 M16-8 
$-----------------------------------------
$ SECTION 4

PANEL 0404 HT 1.5
FACE X LEG 1044 BR1 2044 H1 3044
BOLT LEG 0 BR1 1 M16-8 H1 2 M16-8

PANEL 0403 HT 1.5
FACE XO LEG 1043 BR1 2043 
BOLT LEG 0 BR1 1 M16-8  

PANEL 0402 HT 1.5
FACE XO LEG 1042 BR1 2042
PLAN PLD PB1 5042 PB2 5043 TOP $PB2 IS CONSIDERED SMALLER SECTION FOR COMPLETE INNER DIMOND 
BOLT LEG 0 BR1 1 M16-8 PB 1 M16-8 

PANEL 0401 HT 1.5
FACE XO LEG 1041 BR1 2041 
BOLT LEG 6 M16-82 BR1 1 M16-8 
$-----------------------------------------

$SECTION 3 

PANEL 0304 HT 1.5 TW 2.302
FACE XH1 LEG 1034 BR1 2034 H1 3034 
BOLT LEG 0 BR1 1 M16-8 H1 2 M16-8

PANEL 0303 HT 1.5
FACE XO LEG 1033 BR1 2033 
BOLT LEG 0 BR1 1 M16-8

PANEL 0302 HT 1.5
FACE XO LEG 1032 BR1 2032 
BOLT LEG 0 BR1 1 M16-8

PANEL 0301 HT 1.5
FACE MTRE LEG 1031 BR1 2031 
BOLT LEG 8 M16-82 BR1 1 M16-8 
$-----------------------------------------

$ SECTION 2

PANEL 0202 HT 3.0
FACE K2 INV LEG 1022 BR1 2022 H1 0 R 4022
BOLT LEG 0 BR1 3 M16-8 H1 0 R 1 M16-8 PB 0

PANEL 0201 HT 3.0
FACE K2 LEG 1021 BR1 2021 H1 3021 R 4021
PLAN PL2A PB1 0 PB2 5021 PB3 5022 PB4 5023
BOLT LEG 8 M20-82 BR1 3 M16-8 H1 1 M16-8 R 1 M16-8 PB 1 M16-8
$-----------------------------------------

$ SECTION 1

PANEL 0102 HT 4.0 
FACE KMGD INVERT LEG 1012 BR1 2012 H1 0 R 4012 ND 3
BOLT LEG 0 BR1 3 M16-8 H1 1 M16-8 R 1 M16-8 PB 1 M16-8

PANEL 0101 HT 4.0
FACE KMGD LEG 1011 BR1 2011 H1 3011 R 4011 ND 3
PLAN PL2A PB1 0 PB2 5011 PB3 5012 PB4 5013
BOLT LEG 0 M20-82 BR1 3 M16-8 H1 3 M12-8 R 1 M16-8 PB 1 M16-8
$-----------------------------------------

END

SECTIONS  

 LIBR UK IFACT 1.0

$ LEG     
1011 EA130X130X14 Y FY 235 BH 44
1012 EA130X130X14 Y FY 235 BH 44
1021 EA120X120X12 Y FY 235 BH 44
1022 EA120X120X12 Y FY 235 BH 44
1031 EA110X110X10 Y FY 235 BH 36
1032 EA110X110X10 Y FY 235 BH 36
1033 EA110X110X10 Y FY 235 BH 36
1034 EA110X110X10 Y FY 235 BH 36
1041 EA90X90X10 Y FY 235 BH 36
1042 EA90X90X10 Y FY 235 BH 36
1043 EA90X90X10 Y FY 235 BH 36
1044 EA90X90X10 Y FY 235 BH 36
1051 EA70X70X8 Y FY 235 BH 36
1052 EA70X70X8 Y FY 235 BH 36
1053 EA70X70X8 Y FY 235 BH 36
1054 EA70X70X8 Y FY 235 BH 36
    
  
    
$ DIAGONALS      
2011 UA102X52X7 Y CONNECT S FY  235 BH 18
2012 UA102X52X7 Y CONNECT S FY  235 BH 18
2021 UA101X51X7 Y CONNECT S FY  235 BH 18
2022 UA101X51X7 Y CONNECT S FY  235 BH 18
2031 EA56X56X6 Y CONNECT S FY  235 BH 18
2032 EA56X56X6 Y CONNECT S FY  235 BH 18
2033 EA56X56X6 Y CONNECT S FY  235 BH 18
2034 EA56X56X6 Y CONNECT S FY  235 BH 18
2041 EA50X50X5 Y CONNECT S FY  235 BH 18
2042 EA50X50X5 Y CONNECT S FY  235 BH 18
2043 EA50X50X5 Y CONNECT S FY  235 BH 18
2044 EA50X50X5 Y CONNECT S FY  235 BH 18
2051 EA50X50X5 Y CONNECT S FY  235 BH 18
2052 EA50X50X5 Y CONNECT S FY  235 BH 18
2053 EA50X50X5 Y CONNECT S FY  235 BH 18
2054 EA50X50X5 Y CONNECT S FY  235 BH 18
    
   
$ HORIZONTALS     
3011 EA60X60X6 Y CONNECT S FY  235 BH 18
3021 EA60X60X6 Y CONNECT S FY  235 BH 18
3034 EA77X77X8 Y CONNECT S FY  235 BH 18
3044 EA70X70X7 Y CONNECT S FY  235 BH 18
3054 EA70X70X7 Y CONNECT S FY  235 BH 18

    
$ REDUNDANTS     
4011 EA51X51X5 Y CONNECT S FY  235 BH 18
4012 EA51X51X5 Y CONNECT S FY  235 BH 18
4021 EA50X50X5 Y CONNECT S FY  235 BH 18
4022 EA50X50X5 Y CONNECT S FY  235 BH 18
    

$ PLAN      
5011 EA70X70X6 Y CONNECT S FY  235 BH 18
5012 EA70X70X6 Y CONNECT S FY  235 BH 18
5013 EA70X70X6 Y CONNECT S FY  235 BH 18
5021 EA60X60X6 Y CONNECT S FY  235 BH 18
5022 EA70X70X7 Y CONNECT S FY  235 BH 18
5023 EA70X70X7 Y CONNECT S FY  235 BH 18
5042 EA70X70X7 Y CONNECT S FY  235 BH 18
5043 EA60X60X6 Y CONNECT S FY  235 BH 18
5052 EA70X70X7 Y CONNECT S FY  235 BH 18
5053 EA60X60X5 Y CONNECT S FY  235 BH 18
5054 EA60X60X5 Y CONNECT S FY  235 BH 18
    
  
   
$ HIP     

$ -----------------------------------------------

END

BOLTDATA

$$ Grade 8.8 
$  Bolts in DOUBLE SHEAR, mostly on legs with DOUBLE splice plate 
M30-82 GR8.8 D 30     AS 706 FY 660  FU 830 FV_TIA 373.5 NSP 2 
M24-82 GR8.8 D 24     AS 452  FY 660  FU 830 FV_TIA 373.5 NSP 2    
M22-82 GR8.8 D 22     AS 380  FY 660  FU 830 FV_TIA 373.5 NSP 2  
M20-82 GR8.8 D 20     AS 314  FY 660  FU 830 FV_TIA 373.5 NSP 2 
M16-82 GR8.8 D 16     AS 201  FY 660  FU 830 FV_TIA 373.5 NSP 2  
M12-82 GR8.8 D 12     AS 113  FY 660  FU 830 FV_TIA 373.5 NSP 2 
$ Bolts in SINGLE SHEAR, mostly on bracings and on legs with SINGLE splice plate 
M30-8  GR8.8 D 30     AS 706  FY 660  FU 830 FV_TIA 373.5 
M24-8  GR8.8 D 24     AS 452  FY 660  FU 830 FV_TIA 373.5 
M22-8  GR8.8 D 22     AS 380  FY 660  FU 830 FV_TIA 373.5  
M20-8  GR8.8 D 20     AS 314  FY 660  FU 830 FV_TIA 373.5 
M18-8  GR8.8 D 18     AS 254  FY 660  FU 830 FV_TIA 373.5 
M16-8  GR8.8 D 16     AS 201  FY 660  FU 830 FV_TIA 373.5 
M12-8  GR8.8 D 12     AS 113  FY 660  FU 830 FV_TIA 373.5 
$ Flange bolts in TENSION, always for CHS or SHS legs flange connections  
M30-8T  GR8.8 D 30     AS 707  FY 660  FU 830 TENS AT 561 
M24-8T  GR8.8 D 24     AS 452  FY 660  FU 830 TENS AT 353 
M22-8T  GR8.8 D 22     AS 380  FY 660  FU 830 TENS AT 303 
M20-8T  GR8.8 D 20     AS 314  FY 660  FU 830 TENS AT 245 
M16-8T  GR8.8 D 16     AS 201  FY 660  FU 830 TENS AT 157 
M12-8T  GR8.8 D 12     AS 113  FY 660  FU 830 TENS AT 84.3 

END
END





`

export default td;

