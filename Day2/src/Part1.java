import java.io.File;
import java.util.Scanner;

public class Part1 {

    public static void main(String[] args) {

        int numSafe = 0;

        try {
            //read the file
            File inputFile = new File("src/input.txt");
            Scanner myReader = new Scanner(inputFile);

            //check each line for safety
            while (myReader.hasNextLine()) {

                String level = myReader.nextLine();//read in the next line
                boolean isSafe = true;

                String[] numbers = level.split("\\s+");//split into string array

                boolean increasing = Integer.parseInt(numbers[0]) < Integer.parseInt(numbers[1]);

                if (increasing) {//if increasing
                    for(int i = 0; i < numbers.length-1; i++) {
                        int number = Integer.parseInt(numbers[i]);

                        //check if the next number is greater than it
                        if(number >= Integer.parseInt(numbers[i + 1])) {
                            isSafe = false;
                            break;//break from for loop
                        }

                        //check if they differ by at most 3
                        if((Math.abs(number - Integer.parseInt(numbers[i + 1])) > 3)) {
                            isSafe = false;
                            break;//break from for loop
                        }
                    }
                } else {//if decreasing
                    for(int i = 0; i < numbers.length-1; i++) {
                        int number = Integer.parseInt(numbers[i]);

                        //check if the next number is greater than it
                        if(number <= Integer.parseInt(numbers[i + 1])) {
                            isSafe = false;
                            break;//break from for loop
                        }

                        //check if they differ by at most 3
                        if((Math.abs(number - Integer.parseInt(numbers[i + 1])) > 3)) {
                            isSafe = false;
                            break;//break from for loop
                        }
                    }
                }

                if(isSafe) numSafe++;
            }

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        System.out.println(numSafe);
    }

}