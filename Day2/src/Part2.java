import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Part2 {
    public static void main(String[] args) {
        int numSafe = 0;

        try {
            //read the file
            File inputFile = new File("src/TestInput.txt");
            Scanner myReader = new Scanner(inputFile);

            //check each line for safety
            while (myReader.hasNextLine()) {


                String line = myReader.nextLine();//read in the next line

                String[] numbers = line.split("\\s+");//split into string array

                List<Integer> level = new ArrayList<>();

                for (String number : numbers) {
                    level.add(Integer.parseInt(number));
                }

                boolean isSafe = checkSafe(level);

                if (isSafe) numSafe++;
            }

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        System.out.println(numSafe);
    }

    public static boolean checkSafe(List<Integer> level) {
        boolean increasing = level.get(0) < level.get(1);

        boolean amISafe = true;

        /*
            First check if it's just safe on its own
         */
        if (increasing) {//if increasing
            for (int i = 0; i < level.size() - 1; i++) {
                int number = level.get(i);

                //check if the next number is greater than it
                if (number >= level.get(i + 1)) {
                    amISafe = false;
                    break;
                }

                //check if they differ by more than 3
                if ((Math.abs(number - level.get(i + 1)) > 3)) {
                    amISafe = false;
                    break;
                }
            }
        } else {//if decreasing
            for (int i = 0; i < level.size() - 1; i++) {
                int number = level.get(i);

                //check if the next number is greater than it
                if (number <= level.get(i + 1)) {
                    amISafe = false;
                    break;
                }

                //check if they differ by at most 3
                if ((Math.abs(number - level.get(i + 1)) > 3)) {
                    amISafe = false;
                    break;
                }
            }
        }

        /*
            check if it would work after removing each number
         */

        if (!amISafe) {//if it is false by this point

            //for each number in the list
            for (int num : level) {
                //remove the number from the list
                List<Integer> copyList = new ArrayList<>(level);
                copyList.remove(copyList.indexOf(num));

                //check to see if it is safe now
                if (increasing) {//if increasing
                    for (int i = 0; i < copyList.size() - 1; i++) {
                        int number = copyList.get(i);

                        //check if the next number is greater than it
                        if (number <= copyList.get(i + 1)) {
                            return true;
                        }

                        //check if they differ by more than 3
                        if ((Math.abs(number - copyList.get(i + 1)) < 3)) {
                            return true;
                        }
                    }
                } else {//if decreasing
                    for (int i = 0; i < copyList.size() - 1; i++) {
                        int number = level.get(i);

                        //check if the next number is greater than it
                        if (number >= copyList.get(i + 1)) {
                            return true;
                        }

                        //check if they differ by more than 3
                        if ((Math.abs(number - copyList.get(i + 1)) > 3)) {
                            return true;
                        }
                    }
                }

            }

        }

        return amISafe;
    }
}
