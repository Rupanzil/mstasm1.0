const td = `
$ Site - K0014  446203_GHAFAT_EXCH
$ Analysed by R.K.M.
$ Date 13-Jan-2022

TITL1  60.0m TOWER 
TITL2
UNITS 1 $ 1=METRIC   4=US

PROFILE  
FACES 4
WBASE 6.59
RLBAS 0 


$ Section 12    
PANEL 1203 HT 1.24 TW 1.60
FACE XH1 LEG 1123 BR1 2123 H1 3123
PLAN PLS PB1 5123 TOP
BOLT LEG 0 M16-82 BR1 1 M16-8 H1 1 M16-8 PB 2 M16-8

PANEL 1202 HT 1.88
FACE X LEG 1122 BR1 2122 H1 3122
PLAN PLD PB1 0 PB2 5122 TOP
BOLT LEG 0 M16-82 BR1 1 M16-8 H1 2 M16-8 PB 1 M16-8

PANEL 1201 HT 1.88
FACE X0 LEG 1121 BR1 2121
BOLT LEG 4 M16-82 BR1 1 M16-8
$____________________________________________

$ Section 11
PANEL 1102 HT 2.5 TW 1.60
FACE XH1 LEG 1112 BR1 2112 H1 3112
PLAN PLS PB1 5112 TOP
BOLT LEG 0 M16-82 BR1 1 M16-8 H1 1 M16-8 PB 2 M16-8

PANEL 1101 HT 2.5
FACE XH1 LEG 1111 BR1 2111 H1 3111
BOLT LEG 4 M16-82 BR1 1 M16-8 H1 1 M16-8
$____________________________________________

$ Section 10
PANEL 1003 HT 1
FACE K LEG 1103 BR1 2103 H1 3103 
BOLT LEG 0 M16-82 BR1 1 M16-8 H1 2 M16-8

PANEL 1002 HT 2
FACE XH1 LEG 1102 BR1 2102 H1 3102
BOLT LEG 0 M16-82 BR1 1 M16-8 H1 1 M16-8

PANEL 1001 HT 2
FACE XH1 LEG 1101 BR1 2101 H1 3101
BOLT LEG 6 M16-82 BR1 1 M16-8 H1 1 M16-8
$____________________________________________

$ Section 09
PANEL 0903 HT 1.5
FACE XH1 LEG 1093 BR1 2093 H1 3093
BOLT LEG 0 M16-82 BR1 1 M16-8 H1 1 M16-8

PANEL 0902 HT 1.5
FACE XH1 LEG 1092 BR1 2092 H1 3092
BOLT LEG 0 M16-82 BR1 1 M16-8 H1 1 M16-8

PANEL 0901 HT 2
FACE XH1 LEG 1091 BR1 2091 H1 3091
BOLT LEG 6 M16-82 BR1 1 M16-8 H1 1 M16-8 
$____________________________________________

$ Section 08
PANEL 0802 HT 2
FACE K1 LEG 1082 BR1 2082 BR2 0 H1 3082 R1 4082 R2 4082
BOLT LEG 0 M16-82 BR1 1 M16-8 H1 2 M16-8 R 1 M16-8

PANEL 0801 HT 3
FACE XH2 LEG 1081 BR1 2081 H1 3081 R1 4081
BOLT LEG 6 M16-82 BR1 1 M16-8 H1 2 M16-8 R 1 M16-8
$____________________________________________

$ Section 07 
PANEL 0702 HT 2.5
FACE XH2 LEG 1072 BR1 2072 H1 3072 R1 4072
BOLT LEG 0 M16-82 BR1 1 M16-8 H1 2 M16-8 R 1 M16-8

PANEL 0701 HT 2.5
FACE XTR F1 0.5 LEG 1071 BR1 2071 R1 4071 R2 4071 R3 4071
BOLT LEG 8 M16-82 BR1 1 M16-8 R 1 M16-8
$____________________________________________

$ Section 06
PANEL 0602 HT 2
FACE K1 LEG 1062 BR1 2062 BR2 0 H1 3062 R1 4062 R2 4062
PLAN PL2 PB1 0 PB2 5062 PB3 0 TOP
BOLT LEG 0 M16-82 BR1 2 M16-8 H1 2 M16-8 R 1 M16-8 PB 1 M16-8 

PANEL 0601 HT 3
FACE XH2 LEG 1061 BR1 2061 H1 3061 R1 4061
BOLT LEG 8 M16-82 BR1 2 M16-8 H1 2 M16-8 R 1 M16-8 
$____________________________________________

$ Section 05
PANEL 0501 HT 5
FACE XH3 LEG 1051 BR1 2051 H1 3051 R1 4051
BOLT LEG 10 M16-82 BR1 2 M16-8 H1 2 M16-8 R 1 M16-8
$____________________________________________

$ Section 04
PANEL 0401 HT 5
FACE K2 LEG 1041 BR1 2041 H1 3041 R1 4041
PLAN PL2 PB1 0 PB2 5041 PB3 0 TOP
HIP HS ND 3 HP1 0 HP2 6041 HP3 0
BOLT LEG 12 M16-82 BR1 2 M16-8 H1 2 M16-8 R 1 M16-8 PB 1 M16-8 HP 1 M16-8
$____________________________________________

$ Section 03
PANEL 0301 HT 5
FACE KM NTR 1 ND 1 LEG 1031 BR1 2031 H1 3031 R1 4031 R2 4031 R3 4031 R4 4031 R5 4031
PLAN PL2 PB1 0 PB2 5031 PB3 0 TOP
HIP HS ND 3 HP1 0 HP2 6031 HP3 0
BOLT LEG 12 M16-82 BR1 2 M16-8 H1 2 M16-8 R 1 M16-8 PB 1 M16-8 HP 1 M16-8
$____________________________________________

$ Section 02
PANEL 0201 HT 5
FACE KM NTR 1 ND 1 LEG 1021 BR1 2021 H1 3021 R1 4021 R2 4021 R3 4021 R4 4021 R5 4021
PLAN PP4 PB1 0 PB2 5021 PB3 5022 PB4 0 PB5 0 PB6 0 TOP
HIP HS ND 3 HP1 0 HP2 6021 HP3 0
BOLT LEG 12 M16-82 BR1 2 M16-8 H1 2 M16-8 R 1 M16-8 PB 1 M16-8 HP 1 M16-8
$____________________________________________

$ Section 01

PANEL 0101 HT 5
FACE KM NTR 1 ND 1 LEG 1011 BR1 2011 H1 3011 R1 4011 R2 4011 R3 4011 R4 4011 R5 4012
PLAN PP4 PB1 0 PB2 5011 PB3 5012 PB4 0 PB5 0 PB6 0 TOP
BOLT LEG 12 M16-82 BR1 2 M16-8 H1 2 M16-8 R 1 M16-8 PB 1 M16-8


END

SECTIONS  

LIBR UK IFACT 1.0

$ LEG     
1011 EA150X150X13 Y FY 355 BH 72
1021 EA150X150X12 Y FY 355 BH 72
1031 EA150X150X12 Y FY 355 BH 72
1041 EA150X150X10 Y FY 355 BH 72
1051 EA130X130X10 Y FY 355 BH 72
1061 EA130X130X10 Y FY 355 BH 72  
1062 EA130X130X10 Y FY 355 BH 72 
1071 EA120X120X10 Y FY 355 BH 72
1072 EA120X120X10 Y FY 355 BH 72
1081 EA120X120X10 Y FY 355 BH 36
1082 EA120X120X10 Y FY 355 BH 36
1091 EA100X100X8  Y FY 355 BH 36
1092 EA100X100X8  Y FY 355 BH 36
1093 EA100X100X8  Y FY 355 BH 36
1101 EA100X100X8  Y FY 355 BH 36
1102 EA100X100X8  Y FY 355 BH 36
1103 EA100X100X8  Y FY 355 BH 36
1111 EA90X90X6    Y FY 355 BH 36
1112 EA90X90X6    Y FY 355 BH 36
1121 EA75X75X6    Y FY 355 BH 36
1122 EA75X75X6    Y FY 355 BH 36
1123 EA75X75X6    Y FY 355 BH 36
  
$ DIAGONALS      
2011 EA90X90X7 Y CONNECT S FY  355 BH 18
2021 EA75X75X6 Y CONNECT S FY  355 BH 18
2031 EA75X75X6 Y CONNECT S FY  355 BH 18
2041 EA75X75X6 Y CONNECT S FY  355 BH 18
2051 EA80X80X6 Y CONNECT S FY  355 BH 18
2061 EA65X65X5 Y CONNECT S FY  355 BH 18
2062 EA55X55X5 Y CONNECT S FY  355 BH 18
2071 EA55X55X5 Y CONNECT S FY  355 BH 18
2072 EA55X55X5 Y CONNECT S FY  355 BH 18
2081 EA55X55X5 Y CONNECT S FY  355 BH 18
2082 EA50X50X5 Y CONNECT S FY  355 BH 18
2091 EA50X50X5 Y CONNECT S FY  355 BH 18
2092 EA50X50X5 Y CONNECT S FY  355 BH 18
2093 EA50X50X5 Y CONNECT S FY  355 BH 18
2101 EA50X50X5 Y CONNECT S FY  355 BH 18
2102 EA50X50X5 Y CONNECT S FY  355 BH 18
2103 EA50X50X5 Y CONNECT S FY  355 BH 18
2111 EA45X45X5 Y CONNECT S FY  355 BH 18
2112 EA45X45X5 Y CONNECT S FY  355 BH 18
2121 EA45X45X5 Y CONNECT S FY  355 BH 18
2122 EA45X45X5 Y CONNECT S FY  355 BH 18
2123 EA45X45X5 Y CONNECT S FY  355 BH 18
 
$ HORIZONTALS     
3011 EA65X65X5 Y CONNECT S FY  355 BH 18
3021 EA65X65X6 Y CONNECT S FY  355 BH 18
3031 EA65X65X6 Y CONNECT S FY  355 BH 18
3041 EA65X65X6 Y CONNECT S FY  355 BH 18
3051 EA65X65X6 Y CONNECT S FY  355 BH 18
3061 EA65X65X5 Y CONNECT S FY  355 BH 18
3062 EA55X55X5 Y CONNECT S FY  355 BH 18
3072 EA60X60X6 Y CONNECT S FY  355 BH 18
3081 EA60X60X6 Y CONNECT S FY  355 BH 18
3082 EA60X60X6 Y CONNECT S FY  355 BH 18
3091 EA45X45X5 Y CONNECT S FY  355 BH 18
3092 EA45X45X5 Y CONNECT S FY  355 BH 18
3093 EA45X45X5 Y CONNECT S FY  355 BH 18
3101 EA45X45X5 Y CONNECT S FY  355 BH 18
3102 EA45X45X5 Y CONNECT S FY  355 BH 18
3103 EA60X60X6 Y CONNECT S FY  355 BH 18
3111 EA45X45X5 Y CONNECT S FY  355 BH 18
3112 EA45X45X5 Y CONNECT S FY  355 BH 18
3122 EA60X60X6 Y CONNECT S FY  355 BH 18
3123 FP50X5    Y CONNECT C FY  355 BH 18

$ REDUNDANTS   
4011 EA45X45X5 Y CONNECT S FY  355 BH 18
4012 EA50X50X5 Y CONNECT S FY  355 BH 18
4021 EA45X45X5 Y CONNECT S FY  355 BH 18
4031 EA45X45X5 Y CONNECT S FY  355 BH 18
4041 EA45X45X5 Y CONNECT S FY  355 BH 18
4051 EA45X45X5 Y CONNECT S FY  355 BH 18
4061 EA45X45X5 Y CONNECT S FY  355 BH 18
4062 EA45X45X5 Y CONNECT S FY  355 BH 18
4071 EA45X45X5 Y CONNECT S FY  355 BH 18
4072 EA45X45X5 Y CONNECT S FY  355 BH 18
4081 EA45X45X5 Y CONNECT S FY  355 BH 18
4082 EA45X45X5 Y CONNECT S FY  355 BH 18

$ PLAN BRACING 
5011 EA60X60X6 Y CONNECT S FY  355 BH 18
5012 EA45X45X5 Y CONNECT S FY  355 BH 18
5021 EA60X60X6 Y CONNECT S FY  355 BH 18
5022 EA45X45X5 Y CONNECT S FY  355 BH 18
5031 EA75X75X6 Y CONNECT S FY  355 BH 18
5041 EA75X75X6 Y CONNECT S FY  355 BH 18
5062 EA75X75X6 Y CONNECT S FY  355 BH 18
5112 EA50X50X6 Y CONNECT S FY  355 BH 18
5122 EA75X75X6 Y CONNECT S FY  355 BH 18
5123 EA50X50X6 Y CONNECT S FY  355 BH 18

$ HIP BRACING 
6021 EA55X55X5 Y CONNECT S FY  355 BH 18
6031 EA50X50X6 Y CONNECT S FY  355 BH 18
6041 EA45X45X5 Y CONNECT S FY  355 BH 18


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

