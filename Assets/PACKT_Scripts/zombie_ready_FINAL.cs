using UnityEngine;
using System.Collections;

public class zombie_ready_FINAL : MonoBehaviour 
{
	public Animator theAnimator;
	public CharacterController charControl;
	public float walkSpeed = 2f;

	public Transform target;
	public bool alerted;
	public AudioClip snarlSound;
	public bool soundReady = true;
	public AudioSource theSnarl;

	public float turnSpeed = 60f;
	public bool turning;
	public float angle;

	void Start () 
	{
		theAnimator = GetComponent<Animator>();
		charControl = GetComponent<CharacterController>();
		theSnarl = GetComponent<AudioSource>();
		theSnarl.clip = snarlSound;

		Invoke ("Walks", Random.Range (3f, 5f));
	}
	
	void Update () 
	{
		theAnimator.SetBool ("IsTurning", turning);

		if(Input.GetButton("Fire1") && alerted == false)
		{
			alerted = true;
		}

		if(alerted)
		{
			TurnToPlayer();
			if(angle > 5f ||angle < -5f)
			{
				turning = true;
				theAnimator.SetFloat("Speed",0f);
			}
			else if(angle < 5f && angle > -5f)
			{
				if(soundReady)
				{
					Snarl();
				}
				else
				{
					turning = false;
					WalkTowards();
				}
			}
		}

	}

	void Walks()
	{
		theAnimator.SetBool ("IsWalking", true);
		return;
	}

	void TurnToPlayer()
	{
		theAnimator.SetBool("IsWalking",false);
		Vector3 localRotate = transform.InverseTransformPoint(target.position);
		angle = Mathf.Atan2 (localRotate.x, localRotate.z) * Mathf.Rad2Deg;
		float maxRotation = turnSpeed * Time.deltaTime;
		float turnAngle = Mathf.Clamp(angle, -maxRotation, maxRotation);
		transform.Rotate(0f, turnAngle, 0f);
		//return angle;
	}

	void WalkTowards()
	{
		Vector3 direction = transform.TransformDirection(Vector3.forward * 	walkSpeed);
		charControl.SimpleMove(direction);
		theAnimator.SetBool("IsWalking", true);
	}

	void Snarl()
	{
		theSnarl.Play();
		theAnimator.SetTrigger("IsSnarling");
		soundReady = false;
	}

}
